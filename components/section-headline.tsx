import { cn } from '@/lib/utils'
import React from 'react'

function SectionHeadline({
    title,
    styles
}: {
    title: string,
    styles?: string
}) {
  return (
    <div className={cn(styles)}>
        <div className="relative text-center">
            <h2 className='text-xl font-bold tracking-tight text-gray-800 sm:text-4xl'>{title}</h2>
            <div className="absolute bg-primary w-full h-6 -z-10 -bottom-2"></div>
        </div>
    </div>
  )
}

export default SectionHeadline