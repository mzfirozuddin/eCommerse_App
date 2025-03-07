import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        {
            sub: payload.id,
            email: payload.email,
            role: payload.role,
            name: payload.name,
        },
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiry, algorithm: "HS256" },
    );
};

export const generateRefreshToken = (id) => {
    return jwt.sign({ sub: id }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiry,
        algorithm: "HS256",
    });
};
