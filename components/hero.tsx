import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function Hero() {

    const session = await getServerSession(authOptions)

    return (
        <div className='py-48 sm:py-0'>
            <div className="flex items-center justify-between sm:py-48 sm:bg-hero bg-cover bg-no-repeat bg-center">

                <div className="mx-auto max-w-2xl text-center lg:text-left">
                    <h1 className='text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl'>
                        Unlock Extra Income, Rent Your Unused Items Today!
                    </h1>
                    <p className='mt-6 text-lg leading-8 text-gray-500'>
                        Turn your idle gear and tools into cash. Join our community, connect with renters, and start earning effortlessly.
                    </p>
                    <Link 
                    className={cn(buttonVariants(), 
                        "mt-10 font-semibold shadow-md hover:shadow-none")}
                    href={`${session ? '/my-listings' : 'api/auth/signin'}`}
                    >Start Now &rarr;</Link>
                </div>

                <Image 
                className='w-auto h-auto hidden lg:block mx-auto'
                src={'/hero-items.png'} alt='hero items' 
                width={600} height={0}/>
            </div>
        </div>
    )
}

export default Hero