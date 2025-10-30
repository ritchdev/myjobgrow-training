import mongoose, { Schema, model } from "mongoose"

const taskSchema = Schema({
    taskname: {
        type: String,
        min: [10, "Task Name cannot be shorter than 2 characters"],
        max: [100, "Task Name cannot be longer than 100 characters"],
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    completeBy:{
        type: Date,
        min: [Date.now, "Cannot schedule a task in the past"]
    }
})

export const Task = model("Task", taskSchema);