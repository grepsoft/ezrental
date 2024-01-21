import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDB } from "@/lib/mongodb"
import { BookingModel } from "@/schemas/booking"
import { ItemModel } from "@/schemas/item"
import { BookingStatus, Item } from "@/types"
import { isSameDay } from "date-fns"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function POST(
    req: Request,
    { params }: {params: { itemid: string}}
) {

    try {

        await connectToDB()

        const session = getServerSession(authOptions)
        if (!session) {
            return new NextResponse("unauthorized", { status: 401})
        }

        const item = await ItemModel.findById<Item>(params.itemid)
        if (!item) return new NextResponse("Item not found", { status: 404})

        const body = await req.json()

        console.log(params.itemid)
        const {
            itemid,
            guestid,
            rentstart,
            rentend,
            duration,
            durationtype,
            amount,
            stripeid
        } = body

        let bookingStatus = BookingStatus.PENDING

        if (isSameDay(rentstart, new Date())) {
            bookingStatus = BookingStatus.RENTED
        }

        const bookedItem = await BookingModel.create({
            itemid: itemid,
            guestid: guestid,
            rentstart: rentstart,
            rentend: rentend,
            duration: duration,
            durationtype: durationtype,
            amount: amount,
            stripeid: stripeid,
            status: bookingStatus
        })

        return new NextResponse("item booked", {status: 200})

    } catch(error) {
        console.log(error)
        return new NextResponse("server error", { status: 500})
    }
}