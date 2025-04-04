import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const uri = `mongodb+srv://thisissamuelyeboah:${process.env.MONGODB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/?retryWrites=true&w=majority&appName=KwabsCluster`
const connectDB = async () => {
    console.log('connecting to mongodb')
    try {
        await mongoose.connect(uri, { dbName: 'bpm' })
        console.log("connected to db")
    } catch (error) {
        console.log("Error connecting to the database", error)
    }
}

export default connectDB;