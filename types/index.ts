import { Document } from 'mongoose'

export interface Item extends Document {
    name: string,
    hostid?: string,
    price: Price,
    photos: string[],
    description: string,
    status: string,
    category: string,
    numberOfBookings?: number
}

export interface Booking extends Document {
    itemid?: string,
    guestid?: string,
    rentstart: Date,
    rentend: Date,
    duration: number        // number of days or hours
    durationtype: string    // hourly or daily
    amount: number
    comment: string,
    rating: number          // out of 5
    stripeid?: string,
    status: BookingStatus
    /*
        pending // item to pickup in future
        rented  // currently guest has item
        returned // when an item is returned
        
    */
}

export enum BookingStatus {
    PENDING = 'PENDING',
    RENTED = 'RENTED',
    RETURNED = 'RETURNED',
    CANCELLED = 'CANCELLED'
}

export type Price = {
    daily: number,
    hourly: number
}

export type User = {
    id: string,
    name: string,
    image: string,
    emailVerified: Date,
    phone: string,
    email: string,
}

export enum ItemStatus {
    LISTED = 'listed',
    UNLISTED = 'unlisted'
}