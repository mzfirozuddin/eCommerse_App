import dotenv from "dotenv";
dotenv.config();

const _config = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    node_env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
