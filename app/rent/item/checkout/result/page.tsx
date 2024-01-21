import { stripe } from '@/lib/stripe'
import React from 'react'
import Stripe from 'stripe'
import { Metadata } from '@stripe/stripe-js'
import { CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { headers } from 'next/headers'

async function RentItemCheckoutResultPage({
    searchParams
}: {
    searchParams: { session_id: string}
}) {

    if (!searchParams.session_id) {
        throw new Error("Please provide a valid session id")
    }

    const checkoutSession: Stripe.Checkout.Session = 
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
        expand: ['line_items', "payment_intent"]
    })

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent
    const paymentStatus = paymentIntent.status === 'succeeded' ? 'Payment successful' : 'Payment failed'

    let rentstart = ''
    if (paymentIntent.status === 'succeeded') {
        const metadata = checkoutSession.metadata as Metadata
        rentstart = metadata['rentstart']

        await fetch(`http://localhost:3000/api/item/${metadata['itemid']}/rent`, {
            method: 'POST',
            body: JSON.stringify({
                itemid: metadata['itemid'],
                stripeid: checkoutSession.id,
                guestid: metadata['guestid'],
                rentstart: rentstart,
                rentend: metadata['rentend'],
                duration: metadata['duration'],
                durationtype: metadata['durationtype'],
                amount: metadata['amount'],
            })
        })
    }

  return (
    <div className="flex flex-col justify-center items-center">
        {
            paymentIntent.status === 'succeeded' &&
            <CheckCircle2 size={64} className='text-green-500' />
        }
        <h2 
        className={`${paymentIntent.status === 'succeeded' 
        ? 'text-green-500' : 'text-red-500'} text-2xl py-4`}>{paymentStatus}</h2>
        
        <h3 className="text-lg">Your item has been booked. You can pick your item on{" "}
        <span className='font-bold'>{format(rentstart, 'PPP')}</span>.
        You can <Link href={'/my-rented-items'} className='text-blue-500'>click here</Link>
        {" "} to see the items you have rented.</h3>

    </div>
  )
}

export default RentItemCheckoutResultPage