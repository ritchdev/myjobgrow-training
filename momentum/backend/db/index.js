import mongoose from "mongoose"
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${"test"}`)
        console.log(`\nMongoDB Connected. DB host: ${connectionInstance.connection.host}`)
    } catch(error){
        console.log("MongoDB Connection Error: ", error);
        throw error;
    }
}

export default connectDB