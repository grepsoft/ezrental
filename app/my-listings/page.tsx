

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import ListYourItemComponent from './_component/list-your-item-component'
import { ItemModel } from '@/schemas/item'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import SingleListing from './_component/single-listing'

async function MyListingsPage() {
    const session = await getServerSession(authOptions)

    const myListings = await ItemModel.find({
        hostid: session?.user.id
    })


  return (
    <>
 
        <h1 className='text-2xl sm:text-4xl py-8 font-bold'>{myListings.length} Listings</h1>

        {/* dialog for adding items */}
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus className='mr-4 h-4 w-4' />Add item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new listing</DialogTitle>
                </DialogHeader>
                <ListYourItemComponent />
            </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-8">
            {
                myListings.length > 0 ? 
                <SingleListing listings={myListings} />
                :   
                <p className='text-xl font-light p-4'>No listings</p>

            }
        </div>
    </>
  )
}

export default MyListingsPage