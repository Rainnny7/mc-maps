import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside your .env"
    );
}

let cached = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = {
        connection: undefined,
        promise: undefined,
    };
}

export const connectMongo = async () => {
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                bufferCommands: false,
            })
            .then((mongoose) => {
                return mongoose;
            });
    }
    return (cached.connection = await cached.promise);
};
