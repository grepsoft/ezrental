'use client'

import MaxWContainer from "@/components/max-w-container"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
     
    return (
        <MaxWContainer classes="border rounded shadow-md py-24 mt-8">
            <h1 className="text-2xl font-bold text-center">Welcome to EZRental</h1>

            <hr />

            <div className="flex flex-col items-center w-full space-y-2 py-8">

                <Button 
                onClick={async () => await signIn('google', {
                    callbackUrl: `${window.location.origin}`
                })}
                className="shadow-sm" 
                variant='outline'>
                    <Image width={24} height={24} 
                    className="mr-2"
                    src='/google-logo.svg' 
                    alt='google logo' />
                    Sign in with Google
                </Button>

                <Button 
                onClick={async () => await signIn('facebook', {
                    callbackUrl: `${window.location.origin}`
                })}
                className="shadow-sm" 
                variant='outline'>
                    <Image width={24} height={24} 
                    className="mr-2"
                    src='/facebook-logo.svg' 
                    alt='facebook logo' />
                    Sign in with Facebook
                </Button>
            </div>

        </MaxWContainer>
    )
}