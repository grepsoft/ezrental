'use client'

import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import ItemName from './item-name'
import ItemCategory from './item-category'
import ItemDescription from './item-description'
import ItemPricing from './item-pricing'
import ItemPhotos from './item-photos'
import { useMyListingStore } from '../my-listing-store'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader } from '@/components/loader'

const totalSteps = 5
const stepIncrement = 100 / totalSteps

function ListYourItemComponent() {
    const { data: session } = useSession()
    const myListing = useMyListingStore()
    const [submitting, setSubmitting] = useState(false)
    const [step, setStep] = useState(1)

    const handleNextStepChange = () => {
        if (step === totalSteps) return

        setStep(currentStep => currentStep + 1)
    }

    const handlePrevStepChange = () => {
        if (step === 1) return

        setStep(currentStep => currentStep - 1)
    }

    const handleFinalSubmit = async () => {

        const data = new FormData()

        data.set('data', JSON.stringify(
            {
                item: myListing.data
            }
        ))

        setSubmitting(true)
        const result = await
            fetch(`api/host/${session?.user.id}/item/create`, {
                method: 'POST',
                body: data
            })

        setSubmitting(false)

        if (result.ok) {
            toast("Item created")
        }

    }

    const handleListAnother = () => {
        myListing.restart()
        setStep(1)
    }

    return (
        <>
            <h1 className='text-2xl sm:text-4xl text-center py-8 font-bold'>List your item</h1>

            <div className="space-y-8">

                <Progress value={step * stepIncrement} />

                {{
                    1: <ItemName onNext={handleNextStepChange} />,
                    2: <ItemCategory onNext={handleNextStepChange}
                        onPrev={handlePrevStepChange} />,
                    3: <ItemDescription onNext={handleNextStepChange}
                        onPrev={handlePrevStepChange} />,
                    4: <ItemPricing onNext={handleNextStepChange}
                        onPrev={handlePrevStepChange} />,
                    5: <ItemPhotos onPrev={handlePrevStepChange} />
                }[step]}

                {
                    submitting ?
                        <Loader /> :
                        <div className={`${step < totalSteps ? 'hidden' : 'flex flex-col mt-4 w-full space-y-2'}`}>
                            <Button type='button' onClick={handleFinalSubmit}>Submit</Button>
                            <Button type='button' variant='outline' onClick={handleListAnother}>List another</Button>
                        </div>
                }

            </div>
        </>
    )
}

export default ListYourItemComponent