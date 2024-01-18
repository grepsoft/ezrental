import { cn } from '@/lib/utils'
import React from 'react'

function MaxWContainer({
    children,
    classes
}: {
    children: React.ReactNode,
    classes?: string
}) {
  return (
    <div className={cn('container max-w-2xl sm:max-w-4xl', classes)}>
        {children}
    </div>
  )
}

export default MaxWContainer