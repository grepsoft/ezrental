import Header from '@/components/header'
import MaxWContainer from '@/components/max-w-container'
import React from 'react'

function RentItemLayout({
    children
}: {children: React.ReactNode}) {
  return (
   <>   
    <Header />
    <MaxWContainer classes='py-32'>
        {children}
    </MaxWContainer>
   
   </>
  )
}

export default RentItemLayout