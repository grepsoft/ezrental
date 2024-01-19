import { connectToDB } from "@/lib/mongodb"
import { ItemModel } from "@/schemas/item"
import { Item } from "@/types"
import ItemEditForm from "./_component/item-edit-form"
import { Loader } from "@/components/loader"


async function ItemEditPage({
    params
}: { params: { itemid: string}}) {

    await connectToDB()

    const item = await ItemModel.findById<Item>(params.itemid)
    return (
        <div>
            <h1 className="text-2xl sm:text-4xl py-8 font-bold capitalize">Edit {item?.name}</h1>
            {
                item ? <ItemEditForm item={JSON.parse(JSON.stringify(item))} /> : <Loader />
            }
        </div>
    )
}

export default ItemEditPage