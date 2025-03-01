import winston from "winston";
import { config } from "./config.js";

const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
        serviceName: "eCommerce-app",
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),

    transports: [
        new winston.transports.File({
            dirname: "logs",
            filename: "app.log",
            level: "info",
            silent: config.node_env === "dev",
        }),
        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
            level: "error",
            silent: config.node_env === "test", //: Logger will be silent at the time of test run
        }),
        new winston.transports.Console({
            level: "info",
            silent: config.node_env === "test",
        }),
    ],
});

export default logger;
