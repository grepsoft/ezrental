'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

function ItemPhotos({
    onNext,
    onPrev
}: {
    onNext?: () => void,
    onPrev: () => void
}) {

    return (
        <div className="grid w-full gap-1 5">
            <h2 className='text-xl sm:text-2xl py-4 font-semibold'>Photos</h2>

            <div className="flex justify-between items-center py-4">
                <Button type='button' variant="ghost" onClick={onPrev}>Prev</Button>
            </div>
        </div>
    )
}

export default ItemPhotos