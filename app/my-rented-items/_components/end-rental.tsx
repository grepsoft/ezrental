'use client'

import { Booking, BookingStatus, Item } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import Rating from '@/components/rating'
import { toast } from 'sonner'
import { Stats } from 'fs'


const FormSchema = z.object({
  comment: z.string().min(10, {
    message: "Item comment should be min 10 characters."
  })
})

type EndRentalFormType = z.infer<typeof FormSchema>

function EndRental({
  forItem
}: { forItem: Booking }) {

  const [rating, setRating] = useState(0)
  const router = useRouter()

  const form = useForm<EndRentalFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: ''
    }
  })

  async function onSubmit(data: EndRentalFormType) {

    const result = await fetch(`api/booking/${forItem._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        comment: data.comment,
        rating: rating,
        status: BookingStatus.RETURNED
      })
    })

    if (result.ok) {
      toast.success("Rental ended")
      router.refresh()
    } else {
      toast.error("Operation failed")
      console.log(result)
    }

  }

  const handleStarClick = (index: number) => {
    setRating(index)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-green-500 p-0'>End rental</Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>End rental for{" "}
                <span className='capitalize'>{((forItem.itemid as unknown) as Item).name}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-8 sm:space-y-4 py-8 sm:py-4">
              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} maxLength={200} placeholder='feedback of comment' />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* rating */}
              <div className="flex flex-col space-y-2">
                <p className="py-1">How would you rate the item?</p>
                <Rating rating={rating} ratingClick={handleStarClick} />
              </div>
            </div>

            <DialogFooter>
              <Button type='submit'>End rental</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EndRental