import { connectToDB } from "@/lib/mongodb"
import { ItemModel } from "@/schemas/item"
import { Item } from "@/types"
import { NextResponse } from "next/server"
import { describe } from "node:test"


export async function POST(
    request: Request,
    { params }: { params: { hostid: string}}
)  {

    try {

        const formData: FormData = await request.formData()

        const data = formData.get('data') as string
        const dataJson = JSON.parse(data)
        const hostid  = params.hostid
        const item = dataJson.item as Item

        if (!hostid) {
            return new NextResponse('Host not found', { status: 404 })
        }

        await connectToDB()

        const savedItem = await ItemModel.create({
            name: item.name,
            description: item.description,
            hostid: hostid,
            price: {
                hourly: item.price.hourly,
                daily: item.price.daily
            },
            photos: item.photos ?? [],
            category: item.category
        })

        return NextResponse.json({
            message: "Item created",
            item: savedItem
        })


    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to list item",  { status: 500})
    }
}