import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to database')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
