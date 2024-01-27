
import express from "express";
import { getAllPackages, editPackage, createPackage } from '../controllers/package.controller';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export const packageRoute = express.Router();

// Create new package
packageRoute.get("/packages", getAllPackages);
packageRoute.post("/createPackage", [ isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user'] }), createPackage ]);
packageRoute.post("/packages/:packageId", [ isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user'] }), editPackage ]);

