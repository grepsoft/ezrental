import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className="bg-gray-200 pt-4 mt-8 px-4 sm:px-0">
        <div className="mx-auto py-16 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items center sm:gap-x-32">
                <div className="mb-4">
                    <Image alt='logo' src='/logo.png' width={40} height={40} />
                    <div className="flex flex-col gap-1 py-4">
                        <Link className='text-sm' href='/'>About</Link>
                        <Link className='text-sm' href='/'>Tools</Link>
                        <Link className='text-sm' href='/'>Policies</Link>
                    </div>
                    <Link href="https://grepsoft.com" className='text-sm'>&copy;2024 Grepsoft</Link>
                </div>

                <div className="mb-4">
                    <p className="font-bold">Renting</p>
                    <div className="flex flex-col gap-1 py-4">
                    <Link className='text-sm' href='/'>Listing your item</Link>
                        <Link className='text-sm' href='/'>Tools</Link>
                        <Link className='text-sm' href='/'>Insurance &amp; protection</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer