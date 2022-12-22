import express from "express";
const rentRouter = express.Router();
import { rentCar } from "../controllers/rentController.js";

rentRouter.post("/rentcar", rentCar);

export default rentRouter;
