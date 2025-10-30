import dotenvx from '@dotenvx/dotenvx'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenvx.config({ path: "./.env" })

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Server error: ", error)
        }).listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed: ", error)
        throw error
    })