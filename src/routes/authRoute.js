import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import registerValidator from "../validators/register-validator.js";

const router = express.Router();
const authController = new AuthController();

router.post(
    "/register",
    registerValidator,
    asyncWrapper(authController.register),
);

export default router;
