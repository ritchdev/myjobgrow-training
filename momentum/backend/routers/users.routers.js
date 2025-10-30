import express from "express"
import { registerUser, loginUser, getAllUsers } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.route("/").get(getAllUsers)

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

export default userRouter
