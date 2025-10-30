import mongoose, { Schema, model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
            lowercase: true,
            min: [5, "Username cannot be shorter than 5 characters"],
            max: [30, "Username cannot be longer than 30 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true,
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);