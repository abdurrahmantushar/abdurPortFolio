import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()



if(!process.env.MONGODB_URI){
    throw new Error ('Please provide MONGODB_URI in the .env file')
}

export const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB connect error:', error.message)
        process.exit(1)
    }
}