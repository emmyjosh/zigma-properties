import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`
        mongoDB connected!
        host : ${connection.connection.host}
        `)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default {connectDB};