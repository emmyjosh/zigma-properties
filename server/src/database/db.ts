import db from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: './config/config.env' });// config.env environment


const connectDB :() => Promise<void> = async () : Promise<void> => {
    try {
        const connect = await db.connect(process.env.MONGO_URI!); //try to connect
        console.log(`Connected to MongoDB @ : ${connect.connection.host}`); // tell the console
    } catch (error) {
        console.error(error); // catch any error and console it
        process.exit(1); // exit the operation
    }
} // connect to MongoDB

export default connectDB; //export connectdb 