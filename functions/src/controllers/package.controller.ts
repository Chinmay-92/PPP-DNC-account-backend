
// import { doc, updateDoc } from "firebase/firestore";
const asyncHandler = require("express-async-handler");
import { db } from "../routes/userRoute";
// db.settings({ignoreUndefinedProperties: true});
const packageCollection = "packages";

export const getAllPackages = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const packageQuerySnapshot = await db.collection(packageCollection).get();
        const packages: any[] = [];
        packageQuerySnapshot.forEach(
          (doc: any) => {
            packages.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        );
        res.status(200).json(packages);
      } catch (error) {
        res.status(500).send(error);
      }
    });

export const createPackage = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const packageQuerySnapshot = await db.collection(packageCollection).get();
        const packages: any[] = [];
        packageQuerySnapshot.forEach(
            (doc: any) => {
            packages.push({
                id: doc.id,
                data: doc.data(),
            });
            }
        );
        res.status(200).json(packages);
        } catch (error) {
        res.status(500).send(error);
        }
    });

export const editPackage = asyncHandler(async (req: any, res: any, next: any) => {
        const packageId = req.params.packageId;
        db.collection(packageCollection).doc(packageId).update(req.body)
            .then((packageData) => {
                res.status(201).json({id: packageData, data: packageData});
            })
            .catch((error: any) => res.status(500).send('SOME ISSUE IN UPDATE', error));
 
        /* const packageSnapshot = await db.collection(packageCollection).doc(packageId).get();
        packageSnapshot.ref.update(req.body); */
        
        /* db.collection(packageCollection).doc(packageId).get()
            .then((packageData) => {
                if (!packageData.exists) throw new Error("Package not found");
                console.log('db', db);
                console.log('set', set);
                console.log('ref', ref);
                //db.collection(packageCollection).doc(packageId).update(req.body);
                set(ref(db, 'packages/' + packageId), req.body);
                res.status(201).json({id: packageData.id, data: packageData.data()});
                })
            .catch((error: any) => res.status(500).send(error)); */
    });
