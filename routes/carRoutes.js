import express from "express";
const carRouter = express.Router();
import carController from "../controllers/carController.js";

carRouter.post("/create", carController.createCar);
carRouter.get("/getall", carController.getAllCars);
carRouter.get("/car/:id", carController.getCarById);

export default carRouter;
