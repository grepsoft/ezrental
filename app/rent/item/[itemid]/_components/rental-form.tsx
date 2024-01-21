'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Item } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, addHours, format, formatISO } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import RentStart from './rent-start'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCheckoutSession } from '@/app/actions/stripe'

export const FormSchema = z.object({
    rentalstart: z.date({
        required_error: 'A start date is required'
    }),
    durationtype: z.enum(['hourly', 'daily'], {
        required_error: 'Duration is required'
    }),
    days: z.coerce
        .number({ invalid_type_error: "Days must be a number" })
        .positive({ message: "Days cannot be 0" })
        .finite({ message: "Must be a valid amount" }),
    hours: z.coerce
        .number({ invalid_type_error: "Hours must be a number" })
        .positive({ message: "Hours cannot be 0" })
        .finite({ message: "Must be a valid amount" })
})

function RentalForm({
    itemProp, bookedDates
}: {
    itemProp: string,
    bookedDates: string
}) {
    const user = useSession()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hours: 1,
            days: 1,
            rentalstart: new Date()
        }
    })

    const [rentDetails, setRentDetails] = useState<{
        duration: string,
        price: number,
        unit: string,
        cost: number,
        end: Date
    }>({
        duration: '',
        cost: 0,
        price: 0,
        unit: '',
        end: form.getValues('rentalstart')
    })

    useEffect(() => {

        const item = JSON.parse(itemProp) as Item

        const start = form.getValues('rentalstart')
        const days = form.getValues('days')
        const type = form.getValues('durationtype')
        const forHours = form.getValues('hours') > 0 ? form.getValues('hours') : 1
        const price = type === 'hourly' ? item?.price.hourly : item?.price.daily

        if (start && type) {

            if (type === 'daily') {
                setRentDetails({
                    duration: `${days} days`,
                    price: price,
                    cost: price * days,
                    unit: type,
                    end: addDays(start, Number.parseInt(days.toString()) || 1)
                })
            } else if (type === 'hourly') {
                setRentDetails({
                    duration: `${forHours} hours`,
                    price: price,
                    cost: price * forHours,
                    unit: type,
                    end: addHours(start, forHours)
                })
            }
        }
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('rentalstart'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('days'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('durationtype'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('hours')
    ])


    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const item = JSON.parse(itemProp) as Item

        const formData = new FormData()

        formData.set('amount', `${rentDetails.price}`)
        formData.set('item', `${item.name.toUpperCase()}`)
        formData.set('itemid', item._id)
        formData.set('guestid', user.data?.user.id as string)
        formData.set('rentstart', formatISO(data.rentalstart))
        formData.set('rentend', formatISO(rentDetails.end))
        formData.set('durationtype', data.durationtype)
        formData.set('duration',
            data.durationtype === 'hourly' ? data.hours.toString() : data.days.toString()
        )

        // call stripe checkout Action
        await createCheckoutSession(formData)
    }

    return (
        <Form {...form}>
            {/* summary */}
            {
                rentDetails.price > 0 &&
                <div className="bg-slate-100 p-4 rounded-sm">
                    <p className="text-xl font-bold pb-2">Summary</p>
                    <p className="text-xl">
                        {`$ ${rentDetails.price}`}
                        {`/ ${rentDetails.unit}`}
                        {" x "}
                        {rentDetails.duration}{" = "}
                        <span className='font-bold'>{" $"}{rentDetails.cost}</span>
                    </p>
                </div>
            }

            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="durationtype"
                    render={({ field }) => (
                        <FormItem className='space-y-2 bg-slate-100 p-4 rounded-sm'>
                            <FormLabel>I would like to rent</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-col space-y-1'
                                >
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='hourly' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>
                                            Hourly
                                        </FormLabel>
                                    </FormItem>

                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='daily' />
                                        </FormControl>
                                        <FormLabel className='font-normal'>
                                            Daily
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* rent start */}
                <RentStart form={form} bookedDays={JSON.parse(bookedDates)} />

                {
                    rentDetails.unit &&
                    <p className="bg-slate-100 p-4 rounded-sm font-bold">
                        {`Returning on: ${format(rentDetails.end, 'PPP')}`}
                    </p>
                }

                {/* hourly */}
                {
                    form.getValues('durationtype') === 'hourly' &&
                    <FormField
                        control={form.control}
                        name='hours'
                        render={({ field }) => (
                            <FormItem className='bg-slate-100 p-4 rounded-sm'>
                                <FormLabel>
                                    Hours renting for
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='e.g. 4' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Min of 1 hour
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                {/* daily */}
                {
                    form.getValues('durationtype') === 'daily' &&
                    <FormField
                        control={form.control}
                        name='days'
                        render={({ field }) => (
                            <FormItem className='bg-slate-100 p-4 rounded-sm'>
                                <FormLabel>
                                    Days renting for
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='e.g. 4' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Min of 1 day
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                <Button className='w-full' type='submit'>Process to payment</Button>
            </form>
        </Form>
    )
}

export default RentalForm