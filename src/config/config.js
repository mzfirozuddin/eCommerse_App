import dotenv from "dotenv";
dotenv.config();

const _config = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    node_env: process.env.NODE_ENV,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
};

export const config = Object.freeze(_config);
