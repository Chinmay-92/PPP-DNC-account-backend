
// import { doc, updateDoc } from "firebase/firestore";
const asyncHandler = require("express-async-handler");
import { db } from "../routes/userRoute";
// db.settings({ignoreUndefinedProperties: true});
const reportCollection = "reports";

export const getAllReports = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const reportQuerySnapshot = await db.collection(reportCollection).get();
        const reports: any[] = [];
        reportQuerySnapshot.forEach(
          (doc: any) => {
            reports.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        );
        res.status(200).json(reports);
      } catch (error) {
        res.status(500).send(error);
      }
    });

export const createReport = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const reportQuerySnapshot = await db.collection(reportCollection).get();
        const reports: any[] = [];
        reportQuerySnapshot.forEach(
            (doc: any) => {
            reports.push({
                id: doc.id,
                data: doc.data(),
            });
            }
        );
        res.status(200).json(reports);
        } catch (error) {
        res.status(500).send(error);
        }
    });

export const editReport = asyncHandler(async (req: any, res: any, next: any) => {
        const reportId = req.params.reportId;
        db.collection(reportCollection).doc(reportId).update(req.body)
            .then((reportData) => {
                res.status(201).json({id: reportData, data: reportData});
            })
            .catch((error: any) => res.status(500).send('SOME ISSUE IN UPDATE', error));
    });
