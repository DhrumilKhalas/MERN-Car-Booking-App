import express from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
