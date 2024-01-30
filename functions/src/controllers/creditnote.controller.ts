
// import { doc, updateDoc } from "firebase/firestore";
const asyncHandler = require("express-async-handler");
import { db } from "../routes/userRoute";
// db.settings({ignoreUndefinedProperties: true});
const creditNoteCollection = "creditNotes";

export const getAllCreditNote = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const creditNoteQuerySnapshot = await db.collection(creditNoteCollection).get();
        const creditNotes: any[] = [];
        creditNoteQuerySnapshot.forEach(
          (doc: any) => {
            creditNotes.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        );
        res.status(200).json(creditNotes);
      } catch (error) {
        res.status(500).send(error);
      }
    });

export const createCreditNote = asyncHandler(async (req: any, res: any, next: any) => {
    try {
        const creditNoteQuerySnapshot = await db.collection(creditNoteCollection).get();
        const creditNotes: any[] = [];
        creditNoteQuerySnapshot.forEach(
            (doc: any) => {
            creditNotes.push({
                id: doc.id,
                data: doc.data(),
            });
            }
        );
        res.status(200).json(creditNotes);
        } catch (error) {
        res.status(500).send(error);
        }
    });

export const editCreditNote = asyncHandler(async (req: any, res: any, next: any) => {
        const creditNoteId = req.params.creditNoteId;
        db.collection(creditNoteCollection).doc(creditNoteId).update(req.body)
            .then((creditNoteData) => {
                res.status(201).json({id: creditNoteData, data: creditNoteData});
            })
            .catch((error: any) => res.status(500).send('SOME ISSUE IN UPDATE', error));
 
        /* const creditNoteSnapshot = await db.collection(creditNoteCollection).doc(creditNoteId).get();
        creditNoteSnapshot.ref.update(req.body); */
        
        /* db.collection(creditNoteCollection).doc(creditNoteId).get()
            .then((creditNoteData) => {
                if (!creditNoteData.exists) throw new Error("CreditNote not found");
                console.log('db', db);
                console.log('set', set);
                console.log('ref', ref);
                //db.collection(creditNoteCollection).doc(creditNoteId).update(req.body);
                set(ref(db, 'creditNotes/' + creditNoteId), req.body);
                res.status(201).json({id: creditNoteData.id, data: creditNoteData.data()});
                })
            .catch((error: any) => res.status(500).send(error)); */
    });
