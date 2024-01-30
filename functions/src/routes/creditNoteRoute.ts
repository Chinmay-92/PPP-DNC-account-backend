
import express from "express";
import { getAllCreditNote, editCreditNote, createCreditNote } from '../controllers/creditnote.controller';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export const creditNoteRoute = express.Router();

// Create new creditNote
creditNoteRoute.get("/creditNotes", getAllCreditNote);
creditNoteRoute.post("/createCreditNote", [ isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user'] }), createCreditNote ]);
creditNoteRoute.post("/creditNotes/:creditNoteId", [ isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user'] }), editCreditNote ]);

