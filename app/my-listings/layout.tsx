import HeaderHost from '@/components/header-host'
import MaxWContainer from '@/components/max-w-container'
import React from 'react'

function MyListingsLayout({
    children
}: {children: React.ReactNode}) {
  return (
    <>
        <HeaderHost />
        <MaxWContainer classes='py-32'>
            {children}
        </MaxWContainer>
    </>
  )
}

export default MyListingsLayout