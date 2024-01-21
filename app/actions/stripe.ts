'use server'

import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/utils'
import { Stripe } from 'stripe'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(data: FormData): Promise<void> {

    const checkoutSession: Stripe.Checkout.Session = 
    await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'book',
        metadata: {
            itemid: data.get('itemid') as string,
            guestid: data.get('guestid') as string,
            rentstart: data.get('rentstart') as string,
            rentend: data.get('rentend') as string,
            durationtype: data.get('durationtype') as string,
            duration: data.get('duration') as string,
            amount: data.get('amount') as string
        },
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: data.get('item') as string
                    },
                    unit_amount: 
                    formatAmountForStripe(Number(data.get('amount') as string), 'usd')
                },
            }
        ],
        success_url:
        `${headers().get('origin')}/rent/item/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headers().get('origin')}`
    })

    redirect(checkoutSession.url as string)
}