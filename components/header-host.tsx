import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Menu } from 'lucide-react'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'

async function HeaderHost() {

    const session = await getServerSession(authOptions)

    return (
        <header className='fixed w-full z-50'>
            <nav className="bg-primary flex items-center justify-between p-4 lg:px-8">
                {/* logo */}
                <div className="flex flex-1">
                    <Link href="/">
                        <span className='sr-only'>Logo</span>
                        <Image
                            width={40}
                            height={40}
                            className='w-auto h-auto'
                            src='/logo.png' alt='logo'
                        />
                    </Link>
                </div>

                { /* quick menu */}
                <div className="flex flex-1 space-x-4">
                    <Link href="/booked-items"
                        className='hidden md:flex md:font-bold'>
                        Booked items
                    </Link>
                    <Link href="/my-listings"
                        className='hidden md:flex md:font-bold'>
                        My listings
                    </Link>
                </div>

                <div className="flex items-center">
                    <Link href="/"
                        className={cn(buttonVariants({ variant: 'outline' }),
                            "shadow hidden md:flex md:mr-2")}>
                        Switch to guest
                    </Link>
                </div>

                {/* drop down menu*/}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex text-slate-500">
                            <Menu />
                            {
                                session?.user &&
                                <p>{session.user.name?.split(' ')[0]}</p>
                            }
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem className='flex md:hidden'>
                            <Link
                                className='text-primary font-bold'
                                href='/'>Switch to guest</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem className='flex lg:hidden'>
                            <Link
                                href={'/booked-items'}>
                                Booked items
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex lg:hidden'>
                            <Link
                                href={'/my-listings'}>
                                My listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex text-left py-0'>
                            {
                                session ? <SignOutButton /> : <SignInButton />
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    )
}

export default HeaderHost