import React from 'react'
import SectionHeadline from './section-headline'
import { itemCategories } from '@/data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'

function BrowseItems() {
    return (
        <section className='py-2 sm:py-16'>
            <SectionHeadline styles='py-12' title='Looking to rent? Browse items' />
            <div className="flex flex-col sm:flex-row gap-4">
                {
                    itemCategories.map(cat => (
                        <>
                            <Card className='flex flex-col items-center hover:shadow-md'>
                                <CardHeader>
                                    <CardTitle>{cat.display}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Image alt={`${cat.name}`} src={`/rent-${cat.name}.jpg`}
                                        width={200} height={100} />
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/rent/${cat.name}`}>Browse &rarr;</Link>
                                </CardFooter>
                            </Card>
                        </>

                    ))
                }
            </div>

        </section>
    )
}

export default BrowseItems