import { Booking, BookingStatus } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema<Booking>({
    itemid: { type: mongoose.Types.ObjectId, ref: 'Item', default: null },
    guestid: { type: mongoose.Types.ObjectId, ref: 'User', default: null },
    rentstart: Date,
    rentend: Date,
    duration: Number,        // number of days or hours
    durationtype: String,    // hourly or daily
    amount: Number,
    comment: String,
    rating: { type: Number, default: 0 },          // out of 5
    stripeid: String,
    status: { type: String, default: BookingStatus.PENDING }
}, {
    timestamps: true
})


export const BookingModel = models.Booking || model('Booking', BookingSchema)