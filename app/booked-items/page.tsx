import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { BookingModel } from '@/schemas/booking'
import { ObjectId } from 'mongodb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingStatus } from '@/types'
import { format } from 'date-fns'
import { formatAmountForDisplay } from '@/lib/utils'

async function BookedItemPage() {

    const session = await getServerSession(authOptions)

    const bookings = await BookingModel.aggregate([
        //1. find items that are booked
        {
            $lookup: {
                from: 'items',
                localField: 'itemid',
                foreignField: '_id',
                as: 'items'
            }
        },
        {
            $unwind: '$items'
        },
        //2. find the guest that booked the item
        {
            $lookup: {
                from: 'users',
                localField: 'guestid',
                foreignField: '_id',
                as: 'guest'
            }
        },
        {
            $unwind: '$guest'
        },
        //3. get the host that created the item
        {
            $lookup: {
                from: 'users',
                localField: 'items.hostid',
                foreignField: '_id',
                as: 'host'
            }
        },
        //4. only return items for the currently logged in host
        {
            $match: { 'host._id': new ObjectId(session?.user.id)}
        },
        {
            $project: {
                rentstart: '$rentstart',
                rentend: '$rentend',
                rating: '$rating',
                itemname: '$items.name',
                guestname: '$guest.name',
                status: '$status',
                amount: '$amount'
            }
        }
    ])

    return (
        <>
            <Tabs defaultValue='rented' className='w-[300px] sm:w-full'>
                <TabsList className='grid w-full grid-cols-4'>
                    <TabsTrigger value='rented'>Rented</TabsTrigger>
                    <TabsTrigger value='pending'>Pending</TabsTrigger>
                    <TabsTrigger value='returned'>Returned</TabsTrigger>
                    <TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value='rented'>
                    <h1 className="text-xl sm:text-2xl py-4">Rented items</h1>
                    <div className='grid grid-cols-1 gap-2 sm:gap-4'>
                        {
                            bookings
                            .filter(booking => booking.status === BookingStatus.RENTED)
                            .map(booking => (
                                <div key={booking._id}
                                className='shadow-sm flex justify-between items-center border px-4 rounded-md'
                                >
                                    <div className="flex flex-col gap-y-2 p-2">
                                        <p className="text-2xl sm:text-xl font-bold capitalize">{booking.itemname}</p>
                                        <p className='sm:text-md text-sm text-gray-500'>
                                            {format(booking.rentstart, 'MMM dd, yyyyy')} - {format(booking.rentend, 'MMM dd, yyyyy')}
                                        </p>
                                        <p className='sm:text-md text-sm text-gray-500 capitalize'>Guest:{" "}
                                            <span className='font-semibold'>{booking.guestname}</span>
                                        </p>
                                        <p>Earnings{" "}
                                        {formatAmountForDisplay(booking.amount, 'usd')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>

                <TabsContent value='pending'>
                    <h1 className="text-xl sm:text-2xl py-4">Pending items</h1>
                    <div className='grid grid-cols-1 gap-2 sm:gap-4'>
                        {
                            bookings
                            .filter(booking => booking.status === BookingStatus.PENDING)
                            .map(booking => (
                                <div key={booking._id}
                                className='shadow-sm flex justify-between items-center border px-4 rounded-md'
                                >
                                    <div className="flex flex-col gap-y-2 p-2">
                                        <p className="text-2xl sm:text-xl font-bold capitalize">{booking.itemname}</p>
                                        <p className='sm:text-md text-sm text-gray-500'>
                                            {format(booking.rentstart, 'MMM dd, yyyyy')} - {format(booking.rentend, 'MMM dd, yyyyy')}
                                        </p>
                                        <p className='sm:text-md text-sm text-gray-500 capitalize'>Guest:{" "}
                                            <span className='font-semibold'>{booking.guestname}</span>
                                        </p>
                                        <p>Earnings{" "}
                                        {formatAmountForDisplay(booking.amount, 'usd')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>

                <TabsContent value='returned'>
                    <h1 className="text-xl sm:text-2xl py-4">Returned items</h1>
                    <div className='grid grid-cols-1 gap-2 sm:gap-4'>
                        {
                            bookings
                            .filter(booking => booking.status === BookingStatus.RETURNED)
                            .map(booking => (
                                <div key={booking._id}
                                className='shadow-sm flex justify-between items-center border px-4 rounded-md'
                                >
                                    <div className="flex flex-col gap-y-2 p-2">
                                        <p className="text-2xl sm:text-xl font-bold capitalize">{booking.itemname}</p>
                                        <p className='sm:text-md text-sm text-gray-500'>
                                            {format(booking.rentstart, 'MMM dd, yyyyy')} - {format(booking.rentend, 'MMM dd, yyyyy')}
                                        </p>
                                        <p className='sm:text-md text-sm text-gray-500 capitalize'>Guest:{" "}
                                            <span className='font-semibold'>{booking.guestname}</span>
                                        </p>
                                        <p className='text-green-500 font-bold'>Earnings{" "}
                                        {formatAmountForDisplay(booking.amount, 'usd')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>

                <TabsContent value='cancelled'>
                    <h1 className="text-xl sm:text-2xl py-4">Cancelled items</h1>
                    <div className='grid grid-cols-1 gap-2 sm:gap-4'>
                        {
                            bookings
                            .filter(booking => booking.status === BookingStatus.CANCELLED)
                            .map(booking => (
                                <div key={booking._id}
                                className='shadow-sm flex justify-between items-center border px-4 rounded-md'
                                >
                                    <div className="flex flex-col gap-y-2 p-2">
                                        <p className="text-2xl sm:text-xl font-bold capitalize">{booking.itemname}</p>
                                        <p className='sm:text-md text-sm text-gray-500'>
                                            {format(booking.rentstart, 'MMM dd, yyyyy')} - {format(booking.rentend, 'MMM dd, yyyyy')}
                                        </p>
                                        <p className='sm:text-md text-sm text-gray-500 capitalize'>Guest:{" "}
                                            <span className='font-semibold'>{booking.guestname}</span>
                                        </p>
                                        <p className='line-through text-slate-500'>Earnings{" "}
                                        {formatAmountForDisplay(booking.amount, 'usd')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default BookedItemPage