import React from 'react'
import List, { ListItem } from './list'
import SectionHeadline from './section-headline'

function HowItWorks() {
  return (
    <section className="py-2 sm:py-16">

        <SectionHeadline styles="py-4 sm:py-16" title='How renting your items work?' />

        <List>
            <ListItem count={1} 
                primary="List your items for free"
                secondary="Yes, that&apos; right! There is no fee to list your item."
            />
            <ListItem count={2} 
                primary="Set your price"
                secondary="You are in complete control of the pricing."
            />
            <ListItem count={3} 
                primary="Sit back and start earning"
                secondary="Earn while you sit on a beach or go on a vacation."
            />
        </List>
    </section>

  )
}

export default HowItWorks