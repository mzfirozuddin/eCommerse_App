import { v4 as uuidv4 } from "uuid";
import { config } from "../config/config.js";
import logger from "../config/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
    const errorId = uuidv4();

    const statusCode = err.status || 500;
    const isProduction = config.node_env === "production";
    const message = isProduction
        ? `An unexpected error occurred.`
        : err.message;

    logger.error(err.message, {
        id: errorId,
        error: err.stack,
        path: req.path,
        method: req.method,
    });

    res.status(statusCode).json({
        errors: [
            {
                ref: errorId,
                type: err.name,
                msg: message,
                path: req.path,
                location: "server",
                stack: isProduction ? null : err.stack,
            },
        ],
    });
};
