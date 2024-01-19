'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMyListingStore } from '../my-listing-store'

const FormSchema = z.object({
    hourly: z
        .coerce
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive({ message: 'Amount must be positive' })
        .finite({ message: 'Must be a valid amount' }),
    daily: z
        .coerce
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive({ message: 'Amount must be positive' })
        .finite({ message: 'Must be a valid amount' }),
})

type ItemPricingInput = z.infer<typeof FormSchema>

function ItemPricing({
    onNext,
    onPrev
}: {
    onNext: () => void,
    onPrev?: () => void
}) {
    const myListing = useMyListingStore()

    const form = useForm<ItemPricingInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hourly: myListing.data.price?.hourly,
            daily: myListing.data.price?.daily
        }
    })

    function onSubmit(data: ItemPricingInput) {
        myListing.updateState({
            price: {
                hourly: data.hourly,
                daily: data.daily
            }
        })
        onNext()
    }

    return (
        <div className="grid w-full gap-1 5">
            <h2 className='text-xl sm:text-2xl py-4 font-semibold'>Pricing</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='hourly'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hourly pricing</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='e.g. 30' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='daily'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Daily pricing</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='e.g. 30' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between items-center py-4'>
                        <Button type='button' variant='ghost' onClick={onPrev}>Prev</Button>
                        <Button type='submit' variant='ghost'>Next</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ItemPricing