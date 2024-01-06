/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as express from "express";

import {userRoute} from "./userRoute";
// import {packageRoute} from "./packageRoute";

export const routes = express.Router();

routes.use(userRoute);
// routes.use(packageRoute);
