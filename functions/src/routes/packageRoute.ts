
import express from "express";
import { getAllPackages, editPackage, createPackage } from '../controllers/package.controller';

export const packageRoute = express.Router();

// Create new package
packageRoute.get("/packages", getAllPackages);
packageRoute.post("/createPackage", createPackage);
packageRoute.post("/packages/:packageId", editPackage);

