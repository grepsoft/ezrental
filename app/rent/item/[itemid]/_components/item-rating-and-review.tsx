import Rating from '@/components/rating'
import { BookingModel } from '@/schemas/booking'
import { UserModel } from '@/schemas/user'
import { Booking, BookingStatus, User } from '@/types'
import { format } from 'date-fns'
import React from 'react'

async function ItemRatingAndReview({
    itemid
}: { itemid: string}) {

    const bookings = await BookingModel.find<Booking>({
        itemid: itemid,
        status: BookingStatus.RETURNED
    }, "comment rating rentstart rentend")
    .populate({path: 'guestid', model: UserModel})

  return (
    <div className='py-4 space-y-4'>
        {
            bookings.length > 0 ?
            bookings.map(booking => (
                <div key={booking._id} className="flex flex-col space-y-2">
                    <Rating rating={booking.rating} />
                    <div className="flex text-sm">
                        <span className="font-semibold">
                            {((booking.guestid as unknown) as User).name.split(' ')[0]}
                        </span>
                        <span className='pl-4 text-slate-500'>
                            {format(booking.rentstart, 'MMM dd, yyyy')}
                        </span>
                    </div>
                    <p className="leading-6">
                        {booking.comment}
                    </p>
                    <hr />
                </div>
            ))
            :
            <h3>No reviews</h3>
        }

    </div>
  )
}

export default ItemRatingAndReview