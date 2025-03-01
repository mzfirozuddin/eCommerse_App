import mongoose from "mongoose";
import { config } from "./config.js";
import { DB_NAME } from "../constant.js";
import logger from "./logger.js";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            logger.info("DB Connected Successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.log(`Error while connected to DB: `, err);
            logger.error("Logger: Error while connected to DB", { error: err });
        });

        await mongoose.connect(`${config.mongodb_url}/${DB_NAME}`);
    } catch (err) {
        console.log("ERROR: Failed to connect DB!!!", err);
        logger.error("ERROR: Failed to connect DB!!!", { error: err });
        process.exit(1);
    }
};

export default connectDB;
