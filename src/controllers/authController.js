import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { authService } from "../services/authService.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import { ROLE } from "../constant.js";
import logger from "../config/logger.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/tokenService.js";

export class AuthController {
    register = async (req, res, next) => {
        //: Validate the request
        const result = validationResult(req);
        // console.log(result.isEmpty());

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

    login = async (req, res, next) => {
        //: Validate the request
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = createHttpError(400, result.array()[0].msg);
            return next(error);
        }

        //: Get data from req.body
        const { email, password } = req.body;

        try {
            //: Check user is exist or not in DB
            const user = await authService.getUserByEmail(email);
            if (!user) {
                const error = createHttpError(404, "User not found!");
                return next(error);
            }

            //: If user present, check password
            const isPasswordCorrect = await comparePassword(
                password,
                user.password,
            );
            if (!isPasswordCorrect) {
                const error = createHttpError(
                    401,
                    "Invalid login credentials!",
                );
                return next(error);
            }

            //: Generate access and refresh token
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
            };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(user._id);

            //: store refeshToken in DB
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });

            //: Store tokens in cookie and send response
            const option = {
                httpOnly: true,
                secure: true,
            };

            res.status(200)
                .cookie("accessToken", accessToken, option)
                .cookie("refreshToken", refreshToken, option)
                .json({ id: user._id, msg: "User login successfully." });
        } catch (err) {
            logger.error("ERROR: Login User", { err });
            next(err);
            return;
        }
    };
}
