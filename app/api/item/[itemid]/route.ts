import { connectToDB } from "@/lib/mongodb";
import { ItemModel } from "@/schemas/item";
import { Item, ItemStatus } from "@/types";
import { NextResponse } from "next/server";

// delete
export async function DELETE(
    req: Request,
    { params }: { params: { itemid: string }}
) {

    try {
        await connectToDB()

        const itemid = params.itemid
    
        let deleteResult = await ItemModel.findByIdAndDelete(itemid)
    
        if (deleteResult) {
    
            /* make sure to delete the photos */
    
            return NextResponse.json({
                message: "item deleted"
            })
        } else {
            return NextResponse.json({ message: "item not found"})
        }
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error", { status: 500})
    }

}

// patch
export async function PATCH(
    req: Request,
    { params } : { params: { itemid: string }}
) {

    try {
    await connectToDB()

    const body = await req.json()

    const { 
        itemname, 
        itemcategory,
        itemdescription,
        hourly,
        daily,
        photos,
        status
         } = body;

         console.log(params.itemid)
        const item = await ItemModel.findById<Item>(params.itemid)

        if (!item) {
            return new NextResponse("item not found", { status: 404 })
        }

        item.name = itemname
        item.description = itemdescription
        item.category = itemcategory
        item.price = {
            hourly: hourly,
            daily: daily
        }
        item.photos = photos
        item.status = status ? ItemStatus.LISTED : ItemStatus.UNLISTED

        await item.save()

        return NextResponse.json({
            message: "Item updated"
        })
    } catch(error) {
        console.log(error)
        return new NextResponse("Server error", { status: 500})
    }

}