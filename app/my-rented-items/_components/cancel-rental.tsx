'use client'

import { Booking, BookingStatus, Item } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function CancelRental({
  forItem
}: { forItem: Booking }) {
  const [alertDialog, setAlertDialog] = useState(false)
  const router = useRouter()

  const handleConfirm = async () => {
    const result = await fetch(`api/booking/${forItem._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: BookingStatus.CANCELLED
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

  return (
    <>
      <Button 
      variant='ghost' className='text-orange-500 p-0'
      onClick={() => setAlertDialog(true)}>Cancel rental</Button>
      <AlertDialog open={alertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel <span className='capitalize'>{((forItem.itemid as unknown) as Item).name}</span> rental
            </AlertDialogTitle>
            <AlertDialogDescription>
              This item will be removed from your rental list. You can always rent it again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertDialog(false)}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Yes, cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  )
}

export default CancelRental