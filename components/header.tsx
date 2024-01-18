import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInButton from './signin-button'
import SignOutButton from './signout-button'

async function Header() {

    const session = await getServerSession(authOptions)

    return (
        <header className='fixed w-full z-50'>
            <nav className="bg-primary flex item-center justify-between p-4 lg:px-8">
                {/* logo */}
                <div className="flex lg:flex-1">
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

                <div className="flex items-center">

                    <Link href="#"
                        className={cn(buttonVariants({ variant: 'outline' }),
                            "shadow hidden md:flex md:mr-2"
                        )}
                    >Switch to host</Link>

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
                            {session &&
                                <DropdownMenuItem>
                                    <Link
                                        className='flex md:hidden'
                                        href={`${session ? '/my-listings' : 'api/auth/signin'}`}>Switch to host</Link>
                                </DropdownMenuItem>
                            }
                            {session &&
                            <>
                                <DropdownMenuItem>
                                    <Link className='font-bold'
                                        href={`${session ? '/my-rented-items' : 'api/auth/signin'}`}>
                                        Rented items
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator></DropdownMenuSeparator>
                                </>
                            }
                            
                            <DropdownMenuItem className='flex text-left py-0'>
                                {
                                    session ? <SignOutButton /> : <SignInButton />
                                }
                            </DropdownMenuItem>
                            <DropdownMenuSeparator></DropdownMenuSeparator>
                            <DropdownMenuItem>How it works?</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}

export default Header