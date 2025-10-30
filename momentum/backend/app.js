import cors from 'cors'
import path from "path"
import express from "express"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"
// import ApiError from './utils/ApiError.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __frontenddirname = path.join(__dirname, "..", "dist")
console.log("Serving frontend from:", __frontenddirname);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static(path.join(__frontenddirname)));
app.use(express.json())
app.use(cookieParser())

// //routes
import userRouter from "./routers/users.routers.js"
import taskRouter from './routers/tasks.routers.js'

app.use("/api/users", userRouter)
app.use("/tasks", taskRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__frontenddirname, "index.html"));
});

// app.use( (req, res)=> {
//     // res.status(404).sendFile(path.join(__dirname, "..", "404.html"));
//     console.log(res)
// });

// app.use((err, req, res, next) => {
//   if (err instanceof ApiError) {
//     // Custom error
//     return res.status(err.statusCode).json({
//       success: err.success,
//       message: err.message,
//       errors: err.errors,
//       data: err.data
//     });
//   }

//   // Fallback for unhandled errors
//   console.error(err);
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//     errors: [],
//     data: null
//   });
// });

export { app }