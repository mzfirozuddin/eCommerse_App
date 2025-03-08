import express from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/authRoute.js";

const app = express();
//: Middleware for handle json data
app.use(express.json());
//: Middleware for handle data from url
app.use(express.urlencoded({ extended: true }));
//: Middleware for handle cookie efficiently
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server health is good." });
});

//: Register routes
app.use("/api/auth", authRouter);

//: Register global error handler
app.use(globalErrorHandler);

export default app;
