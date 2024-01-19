'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMyListingStore } from '../my-listing-store'

const FormSchema = z.object({
    itemname: z.string().min(4, {
        message: 'Item name must be at least 4 characters.'
    })
})

type ItemNameInput = z.infer<typeof FormSchema>

function ItemName({
    onNext,
    onPrev
}: {
    onNext: () => void,
    onPrev?: () => void
}) {

    const myListing = useMyListingStore()

    const form = useForm<ItemNameInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            itemname: myListing.data.name
        }
    })

    function onSubmit(data: ItemNameInput) {
        myListing.updateState({
            name: data.itemname
        })
        onNext()
    }

    return (
        <div className="grid w-full gap-1 5">
            <h2 className='text-xl sm:text-2xl py-4 font-semibold'>Item name</h2>
        
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='itemname'
                        render={({ field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='e.g. Macbook pro' {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is a public facing name. Min 4 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between items-center py-4'>
                        {/* <Button type='button'>Prev</Button> */}
                        <Button type='submit' variant='ghost'>Next</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ItemName