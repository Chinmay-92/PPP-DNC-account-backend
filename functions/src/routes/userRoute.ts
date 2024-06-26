/**
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express, {Request, Response} from "express";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";
import { User } from "../models/user";
import { getAllUsers, loginUser, getUserById } from "../controllers/user.controller";

export const userRoute = express.Router();

// initialize firebase inorder to access its services
export const firebaseAdmin = admin.initializeApp();

// initialize the database and the collection
export const db = admin.firestore();
// db.settings({ignoreUndefinedProperties: true});
const userCollection = "users";

// Create new user
userRoute.post("/users", async (req: Request, res: Response) => {
  const body = JSON.parse(req.body);
  try {
    const user: User = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      designation: body.designation,
      department: body.department,
      id: body.id,
      contactNumber: body.contactNumber,
    };
    const newDoc = await db.collection(userCollection).add(user);
    logger.info(`Created a new user!: ${newDoc.id}`, {structuredData: true});
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(`${error}: User should cointain firstName, 
    lastName, email, designation, department, id and contactNumber!!!`);
  }
});

// get all users
userRoute.get("/users", getAllUsers);

//login user with firebase
userRoute.post("/login", loginUser);

// get user by userId
userRoute.post("/users/:userId", getUserById);

// Delete a user
userRoute.delete("/users/:userId", (req: Request, res: Response) => {
  db.collection(userCollection).doc(req.params.userId).delete()
    .then(() => res.status(204).send("Document successfully deleted!"))
    .catch(function(error) {
      res.status(500).send(error);
    });
});

// Update user
userRoute.put("/users/:userId",
  async (req: Request, res: Response) => {
    await db.collection(
      userCollection).doc(req.params.userId).set(req.body, {merge: true})
      .then(() => res.json({id: req.params.userId}))
      .catch((error) => res.status(500).send(error));
  });
