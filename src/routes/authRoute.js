import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();
const authController = new AuthController();

router.post("/register", asyncWrapper(authController.register));

export default router;
