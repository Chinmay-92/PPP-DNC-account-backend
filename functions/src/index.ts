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
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
// import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

const PORT = 3000;
const app = express();

/* JSON body parse*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.info("Server is running on PORT:", PORT);
});

// initialize the database and the collection
const db = admin.firestore();
const userCollection = "users";

interface User {
    firstName: string,
    lastName: string,
    email: string,
    designation: string,
    department: string,
    id: string,
    contactNumber: string
}

// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      designation: req.body["designation"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    logger.info(`Created a new user!: ${newDoc.id}`, {structuredData: true});
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(`User should cointain firstName, lastName, email, 
    designation, department, id and contactNumber!!!`);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
      (doc) => {
        users.push({
          id: doc.id,
          data: doc.data(),
        });
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a single contact
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get()
    .then((user) => {
      if (!user.exists) throw new Error("User not found");
      res.status(200).json({id: user.id, data: user.data()});
    })
    .catch((error) => res.status(500).send(error));
});


// Delete a user
app.delete("/users/:userId", (req, res) => {
  db.collection(userCollection).doc(req.params.userId).delete()
    .then(() => res.status(204).send("Document successfully deleted!"))
    .catch(function(error) {
      res.status(500).send(error);
    });
});

// Update user
app.put("/users/:userId",
  async (req, res) => {
    await db.collection(
      userCollection).doc(req.params.userId).set(req.body, {merge: true})
      .then(() => res.json({id: req.params.userId}))
      .catch((error) => res.status(500).send(error));
  });

// logger.info("Hello logs!", {structuredData: true});

// define google cloud function name
exports.app = functions.https.onRequest(app);
