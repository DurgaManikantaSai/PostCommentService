import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


/**
 * Creates a new Database Connection
 */
const connectDB = async () => {
    try {
        // const uri : string | undefined = process.env.MONGO_URI;

        const server = await MongoMemoryServer.create();

        const uri = server.getUri();

        if(!uri){
            throw new Error("MONGO_URI is not defined");
        }

        const conn = await mongoose.connect(uri);

        console.log(`MongoDB Connected ${conn.connection.host}`);
    }
    catch (error){
        console.error(`Error: ${(error as Error).message}`)
        process.exit(1);
    }
};

export default connectDB;