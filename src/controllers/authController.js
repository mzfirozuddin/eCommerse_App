import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { authService } from "../services/authService.js";
import { hashPassword } from "../utils/authHelper.js";
import { ROLE } from "../constant.js";
import logger from "../config/logger.js";

export class AuthController {
    register = async (req, res, next) => {
        //: Validate the request
        const result = validationResult(req);
        console.log(result.isEmpty());

        // console.log(req.body);
        if (!result.isEmpty()) {
            const error = createHttpError(400, result.array()[0].msg);
            return next(error);
        }

        //: get details from req.body
        const { name, email, phone, password, address } = req.body;

        try {
            //: Check if user is already is present in DB
            const existingUser = await authService.getUserByEmail(email);
            if (existingUser) {
                const error = createHttpError(409, "Email is already exist!");
                return next(error);
            }

            //: Hash password
            const hashedPassword = await hashPassword(password);

            //: create user object, save on DB
            const user = {
                name,
                email,
                phone,
                address,
                password: hashedPassword,
                role: ROLE.CUSTOMER,
            };
            const newUser = await authService.registerUser(user);
            if (!newUser) {
                const error = createHttpError(
                    500,
                    "Error while registering user!",
                );
                return next(error);
            }

            //: logger message
            logger.info("User Created Successfully.", { id: newUser._id });

            //: Return response
            res.status(201).json({
                id: newUser._id,
                msg: "User Created Successfully.",
            });
        } catch (err) {
            logger.error("ERROR: Register User", { err });
            next(err);
            return;
        }
    };
}
