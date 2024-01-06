/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// import libraries
import * as functions from "firebase-functions";
import express from "express";
import * as bodyParser from "body-parser";
import {routes} from "./routes";

const PORT = 3000;
const app = express();

/* JSON body parse*/
app.use(bodyParser.json({limit: "50mb", type: "application/json"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.info("Server is running on PORT:", PORT);
});

// routes
app.use("/", routes);

// logger.info("Hello logs!", {structuredData: true});

// define google cloud function name
exports.app = functions.https.onRequest(app);
