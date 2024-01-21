import { connectToDB } from '@/lib/mongodb'
import { ItemModel } from '@/schemas/item'
import { UserModel } from '@/schemas/user'
import { Booking, BookingStatus, Item, User } from '@/types'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import RentalForm from './_components/rental-form'
import ItemRatingAndReview from './_components/item-rating-and-review'
import { BookingModel } from '@/schemas/booking'
import { addDays } from 'date-fns'

const getBookedDates = (startdate: Date, numberOfDays: number): Date[] => {
  const bookedDates: Date[] = []
  for (let day = 0; day < numberOfDays; day++) {
    const nextDate = addDays(startdate, day)
    bookedDates.push(nextDate)
  }
  return bookedDates
}

async function RentItemPage({
  params
}: { params: { itemid: string } }) {

  await connectToDB()
  const bookedDates: Date[] = []

  const item = await
    ItemModel.findById<Item>(params.itemid)
      .populate({ path: 'hostid', model: UserModel })

  const datesItemBookedFor = await BookingModel.find<Booking>({
    itemid: params.itemid,
    status: {
      $in: [BookingStatus.PENDING, BookingStatus.RENTED]
    },
    durationtype: 'daily'
  }, "rentstart rentend duration durationtype status"
  )
  datesItemBookedFor.map(d => {
    const dates = getBookedDates(d.rentstart, d.duration)
    bookedDates.push(...dates)
  })



  return (

    <div className='flex flex-col justify-center items-center'>

      {/* images */}
      <Carousel className='w-full max-w-sm sm:max-w-xl'>
        <CarouselContent>
          {
            item?.photos.map(photo => (
              <CarouselItem key={photo}>
                <Image
                  width={600}
                  height={400}
                  src={photo}
                  alt={photo}
                />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full justify-between flex flex-col sm:flex-row">
        <div className="space-y-8 sm:space-y-4">
          <h1 className='text-2xl sm:text-4xl capitalize py-8 font-bold'>{item?.name}</h1>
          <div className="flex">Hosted by:{" "}
            <p className='capitalize font-bold ml-2'>{
              ((item?.hostid as unknown) as User).name
            }</p>
          </div>

          <div className='flex flex-col space-y-2'>
            <p className='font-bold'>Description</p>
            <p>PLEASE READ THE ENTIRE DESCRIPTION</p>
            <p>{item?.description}</p>
          </div>

          <div className="flex flex-col">
            <p className='font-bold'>Rent details</p>
            <ItemRatingAndReview itemid={item?._id} />
          </div>
        </div>

        <div className="items-start space-y-4 pt-8">
          <p className='font-bold'>Rent details</p>
          <RentalForm itemProp={JSON.stringify(item)} bookedDates={JSON.stringify(bookedDates)} />
        </div>
      </div>
    </div>
  )
}

export default RentItemPage