import express from "express";
const companyRouter = express.Router();
import { getByCompany } from "../controllers/companyController.js";

companyRouter.get("/getbycompany/:company", getByCompany);

export default companyRouter;
