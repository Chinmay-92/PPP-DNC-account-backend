
const asyncHandler = require("express-async-handler");
import { db } from "../routes/userRoute";
// db.settings({ignoreUndefinedProperties: true});
const userCollection = "users";

export const getAllUsers = asyncHandler(async (req: any, res: any, next: any) => {
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

