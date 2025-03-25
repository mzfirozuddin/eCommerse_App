import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import registerValidator from "../validators/register-validator.js";
import loginValidator from "../validators/login-validator.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();
const authController = new AuthController();

router.post(
    "/register",
    registerValidator,
    asyncWrapper(authController.register),
);

router.post("/login", loginValidator, asyncWrapper(authController.login));
router.get("/self", verifyJWT, asyncWrapper(authController.self));

export default router;
