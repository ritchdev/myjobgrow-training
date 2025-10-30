import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { Task } from "../models/task.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import TaskValidator from "../validators/task.validators.js";

const preTaskUpdateValidator = asyncHandler(async (userId, taskId) => {
    if (!taskId)
        throw new ApiError(401, "No Task ID Found")
    if (!userId)
        throw new ApiError(401, "No User ID found")

    const user = await User.findById(userId)
    if (!user)
        throw new ApiError(404, "User does not exist")

    return user
})

function checkEmptyField(field) {
    if (field == null || field === "")
        throw new ApiError(409, `Cannot update task with empty field: field = ${field}`)
}

const createTask = asyncHandler(async (req, res) => {
    try {
        const { taskname, isComplete, completeBy } = req.body
        
        const createdBy = req.params.userId

        if (isComplete == null)
            isComplete = false

        //  Validate the input
        const validator = new TaskValidator({ taskname, createdBy, completeBy })

        validator.checkEmptyName()
        await validator.checkCreator(createdBy)
        validator.checkDeadline()

        //  Create a new task instance with these properties
        const task = await Task.create({
            taskname,
            isComplete,
            createdBy,
            completeBy
        })

        //  Add the task to the database(tasks collection)
        await task.save()
        const taskId = task._id
        const taskCreated = await Task.findById(taskId)
        if (!taskCreated)
            throw new ApiError(500, "An error was encountered while creating the task")

        //  Modify the task field of the user(users collection) to include the id of the task
        const targetUser = await User.findByIdAndUpdate(
            createdBy,
            {
                $push: {
                    tasks: taskId
                }
            })
        if (!targetUser)
            throw new ApiError(500, "Something went wrong while updating the user")

        //  Send a valid response
        res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    "Task Created and Added Successfully",
                    {
                        task
                    }
                )
            )
    } catch (error) {
        throw new ApiError(500, "createTask try-catch: ", error?.message || "Something Went Wrong: createTask try-catch", error?.stack)
    }
})

const extractTasks = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId)
            throw new ApiError(401, "Unauthorised Request")

        const user = await User.findById(userId).select("_id tasks").populate({ path: 'tasks', select: '-createdBy -__v' })
        if (!user)
            throw new ApiError(404, "User Not Found")

        const userTasks = user.tasks
        if (!userTasks)
            throw new ApiError(500, "Tasks Undefined for this user")

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Tasks Fetched Successfully",
                    {
                        userTasks
                    }
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching user's tasks")
    }
})

const deleteTask = asyncHandler(async (req, res) => {
    try {
        const taskId = req.body.taskId
        const userId = String(req.user._id)

        if (!req.userVerified)
            throw new ApiError(401, "Unauthorised Request")

        var taskCreator = (await Task.findById(taskId).select("createdBy"))?.createdBy
        taskCreator = String(taskCreator)
        if(!taskCreator)
            throw new ApiError(404, "Could not find the task")

        if (userId != taskCreator)
            throw new ApiError(401, "Task Creator and User Do Not Match")

        const deletedTask = await Task.deleteOne({ _id: taskId })
        if (deletedTask.deletedCount == 0)
            throw new ApiError(500, "Task could not be deleted")

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Task Deleted Successfully",
                )
            )
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, "deleteTask Error: " + error?.message || "Something went wrong while deleting the task" + error?.line)
    }
})

const updateTaskTitle = asyncHandler(async (req, res) => {
    try {
        const { taskname, taskId } = req.body
        const userId = req.params.userId

        await preTaskUpdateValidator(userId, taskId)
        checkEmptyField(taskname)

        const task = await Task.findByIdAndUpdate(taskId, { taskname: taskname })
        if (!task)
            throw new ApiError(500, "Something went wrong while updating values in the database")

        const userIsTaskCreator = await task.createdBy == userId
        if (!userIsTaskCreator)
            throw new ApiError(409, "Unauthorised Request")

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Task Name Updated Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, "updateTask error:", error?.message || "Something went wrong while updating task title")
    }
})

const updateTaskStatus = asyncHandler(async (req, res) => {
    try {
        const { isComplete, taskId } = req.body
        const userId = req.params.userId

        await preTaskUpdateValidator(userId, taskId)
        checkEmptyField(isComplete)

        const task = await Task.findByIdAndUpdate(taskId,
            {
                $set: {
                    isComplete: isComplete
                }
            })
        if (!task)
            throw new ApiError(500, "Something went wrong while updating values in the database")

        const userIsTaskCreator = await task.createdBy == userId
        if (!userIsTaskCreator)
            throw new ApiError(409, "Unauthorised Request")

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Task Status Updated Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, "updateTask error:", error?.message || "Something went wrong while updating task status")
    }
})

const updateTaskDeadline = asyncHandler(async (req, res) => {
    try {
        const { completeBy, taskId } = req.body
        const userId = req.params.userId

        await preTaskUpdateValidator(userId, taskId)
        checkEmptyField(completeBy)
        if(completeBy < Date.now())
            throw new ApiError(409, "Cannot schedule a task in the past")

        const task = await Task.findByIdAndUpdate(taskId, { completeBy: completeBy })
        if (!task)
            throw new ApiError(500, "Something went wrong while updating values in the database")

        const userIsTaskCreator = await task.createdBy == userId
        if (!userIsTaskCreator)
            throw new ApiError(409, "Unauthorised Request")

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Task Deadline Updated Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, "updateTask error:", error?.message || "Something went wrong while updating task deadline")
    }
})

export { extractTasks, createTask, deleteTask, updateTaskTitle, updateTaskStatus, updateTaskDeadline }

