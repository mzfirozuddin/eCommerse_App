import mongoose from "mongoose";
import { config } from "./config.js";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log(`DB Connected Successfully`);
        });

        mongoose.connection.on("error", (err) => {
            console.log(`Error while connected to DB: `, err);
        });

        await mongoose.connect(`${config.mongodb_url}/${DB_NAME}`);
    } catch (err) {
        console.log("ERROR: Failed to connect DB!!!", err);
        process.exit(1);
    }
};

export default connectDB;
