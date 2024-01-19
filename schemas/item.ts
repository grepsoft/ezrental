import { Item, ItemStatus } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema<Item>({
    name: String,
    hostid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    price: {
        daily: Number,
        hourly: Number
    },
    photos: [String],
    description: String,
    status: {
        type: String,
        default: ItemStatus.LISTED
    },
    category: String,
    numberOfBookings: Number
}, {
    timestamps: true
})


export const ItemModel = models.Item || model('Item', ItemSchema)