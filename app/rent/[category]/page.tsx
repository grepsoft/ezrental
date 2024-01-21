import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { itemCategories } from '@/data'
import { connectToDB } from '@/lib/mongodb'
import { ItemModel } from '@/schemas/item'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function RentCategoryPage({
    params
}: { params: { category: string } }) {

    const session = await getServerSession(authOptions)
    await connectToDB()

    const items = await ItemModel.aggregate([
        {
            $match: {
                category: params.category
            }
        },
        {
            $lookup: {
                from: 'bookings',
                let: { itemId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ['$itemid', '$$itemId'] }] } } },
                    {
                        $group: {
                            _id: null,
                            numberOfBookings: {
                                $sum: {
                                    $cond: [{ $eq: ['$status', 'RETURNED'] }, 1, 0]
                                }
                            }
                        }
                    },
                ],
                as: 'bookings'
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'hostid',
                foreignField: '_id',
                as: 'host'
            },
        },
        {
            $unwind: { path: '$bookings', preserveNullAndEmptyArrays: true }
        },
        {
            $unwind: '$host'
        },
        {
            $match: { 'host._id': { $ne: new ObjectId(session?.user.id) } }
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                hostName: { $first: '$host.name' },
                price: { $first: '$price' },
                photos: { $first: '$photos' },
                numberOfBookings: {
                    $sum: '$bookings.numberOfBookings'
                }
            }
        },
        {
            $project: {
                name: 1,
                hostName: '$host.name',
                price: 1,
                photos: 1,
                numberOfBookings: 1
            }
        }
    ])


    return (
        <div>
            <h1 className="text-2xl sm:text-4xl py-8 font-bold">
                Rent {itemCategories.find(cat => cat.name === params.category)?.display}
            </h1>

            <p className='text-slate-400'>found {items.length} item(s)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 py-4">
                {
                    items.map(item => (
                        <Card key={item._id} className='flex flex-col items-center hover:shadow-md'>
                            <CardContent className='px-0'>
                                <Image
                                    className='p-0 max-h-60 sm:max-h-60' alt={item.name}
                                    src={item.photos.at(0)} width={340} height={100}
                                />
                                <div className="flex flex-col p-2">

                                    <p className='capitalize text-lg text-slate-500'>{item.hostName}</p>
                                    <p className='capitalize font-bold 
                                text-xl sm:text-2xl text-slate-500 py-2'>{item.name}</p>

                                    <hr />

                                    <p className='font-semibold pt-4 pb-2'>Price</p>
                                    <div className="flex justify-between py-1">
                                        <div>Daily</div>
                                        <p>${" "}{item.price.daily}</p>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <div>Hourly</div>
                                        <p>${" "}{item.price.hourly}</p>
                                    </div>

                                    <hr className='pt-1 pb-1' />
                                    <div className="flex justify-between leading-6">
                                        <div className="text-slate-500">Past bookings</div>
                                        <p>{item.numberOfBookings}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className='w-full p-0 flex justify-center py-4 sm:py-2'>
                                {
                                    session ?
                                        <Link
                                            className='font-bold text-xl text-primary'
                                            href={`item/${item._id}`}>Rent now</Link>
                                        :
                                        <Link
                                            className='text-blue-500'
                                            href='/auth/sign-in'>Login to rent</Link>
                                }
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default RentCategoryPage