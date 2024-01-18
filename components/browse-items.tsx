import React from 'react'
import SectionHeadline from './section-headline'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

function BrowseItems() {
  return (
    <section className='py-2 sm:py-16'>
        <SectionHeadline styles='py-12' title='Looking to rent? Browse items' />
        <div className="flex flex-col sm:flex-row gap-4">
            <Card className='flex flex-col items-center hover:shadow-md'>
                <CardHeader>
                    <CardTitle>Camera gear</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image alt='camera gear' src='/rent-camera-gear.jpg' 
                    width={200} height={100} />
                </CardContent>
                <CardFooter>
                    <Link href="/rent/camear-gear">Browse &rarr;</Link>
                </CardFooter>
            </Card>

            <Card className='flex flex-col items-center hover:shadow-md'>
                <CardHeader>
                    <CardTitle>Power tools</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image alt='power tools' src='/rent-power-tools.jpg' 
                    width={200} height={100} />
                </CardContent>
                <CardFooter>
                    <Link href="/rent/camear-gear">Browse &rarr;</Link>
                </CardFooter>
            </Card>

            <Card className='flex flex-col items-center hover:shadow-md'>
                <CardHeader>
                    <CardTitle>House tools</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image alt='house gear' src='/rent-house-tools.jpg' 
                    width={200} height={100} />
                </CardContent>
                <CardFooter>
                    <Link href="/rent/camear-gear">Browse &rarr;</Link>
                </CardFooter>
            </Card>
        </div>

    </section>
  )
}

export default BrowseItems