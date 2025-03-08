import jwt from "jsonwebtoken";
import logger from "../config/logger.js";
import { config } from "../config/config.js";
import { authService } from "../services/authService.js";

export const verifyJWT = async (req, res, next) => {
    try {
        //: Collect token
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            const error = (401, "Unauthorized Access!");
            return next(error);
        }

        //: verify token
        const decodedToken = jwt.verify(token, config.accessTokenSecret);

        //: Find user
        const user = await authService.getUserById(decodedToken?.sub);
        if (!user) {
            const error = (401, "Invalid access token!");
            return next(error);
        }

        //: Now add user in req object
        req.user = user;
        next();
    } catch (err) {
        logger.error("ERROR: verifyJWT", { err });
        next(err);
        return;
    }
};
