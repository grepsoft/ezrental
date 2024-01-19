import { Schema, model, models } from "mongoose";
import { User } from "../types";


const UserSchema = new Schema<User> ({
    id: String,
    name: String,
    image: String,
    emailVerified: Date,
    phone: String,
    email: String,
}, {
    timestamps: true
})

export const UserModel = models.User || model('User', UserSchema)