'use client'

import { StarIcon } from 'lucide-react'
import React from 'react'

function Rating({
    rating, ratingClick
}: {
    rating: number,
    ratingClick?: (index: number) => void
}) {


  return (
    <div className="flex">
        {[...Array(5)].map((_, index) => (
            <StarIcon
                key={index}
                onClick={() => ratingClick?.(index + 1)}
                className='cursor-pointer text-orange-300'
                fill={`${index < rating ? 'orange' : '#fff'}`}
                />
        ))}
    </div>
  )
}

export default Rating