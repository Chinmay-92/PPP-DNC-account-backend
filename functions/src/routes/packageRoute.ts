
import express from "express";
import { package_list } from '../controllers/package.controller';

export const packageRoute = express.Router();

// Create new package
packageRoute.get("/packages", package_list);
