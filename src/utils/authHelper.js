import bcrypt from "bcrypt";
import logger from "../config/logger.js";

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        logger.info("ERR: Error while hash the password!!!");
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
