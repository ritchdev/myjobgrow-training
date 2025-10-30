import path from "path"
import { Router } from "express"
import { fileURLToPath } from "url"
// import { verifyUserId } from "../middleware/auth.middleware.js"
// import { extractTasks, createTask, deleteTask, updateTaskTitle, updateTaskStatus, updateTaskDeadline } from "../controllers/tasks.controllers.js"

const taskRouter = Router()
// const __dirname = path.join(fileURLToPath(import.meta.url))

taskRouter.route('/').get((req, res) => console.log("Get Tasks"))

// const loadDashboard = function(req, res) {
//     if(!req.userVerified)
//         return res.redirect(301, "/users/register")
    
//     res.sendFile(path.join(__dirname, "..", "..","..", "frontend", "user-dashboard.html"))
//     //frontend\user-dashboard.html
// }

// taskRouter.route('/:userId')
// .get(verifyUserId, loadDashboard)

// taskRouter.route('/:userId/task-loader')
// .get(extractTasks)

// taskRouter.route('/:userId/add-task')
// .post(createTask)

// taskRouter.route('/:userId/delete-task')
// .delete(verifyUserId, deleteTask)

// taskRouter.route('/:userId/update-task-title')
// .patch(updateTaskTitle)

// taskRouter.route('/:userId/update-task-status')
// .patch(updateTaskStatus)

// taskRouter.route('/:userId/update-task-deadline')
// .patch(verifyUserId, updateTaskDeadline)

export default taskRouter