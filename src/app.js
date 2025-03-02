import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/authRoute.js";

const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server health is good." });
});

//: Register routes
app.use("/api/auth", authRouter);

//: Register global error handler
app.use(globalErrorHandler);

export default app;
