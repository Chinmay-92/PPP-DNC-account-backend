
const asyncHandler = require("express-async-handler");
import { db } from "../routes/userRoute";
// db.settings({ignoreUndefinedProperties: true});
const userCollection = "users";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// const admin = require('firebase-admin');

const serviceAccountJSON = {
    "type": "service_account",
    "project_id": "ppp-dnc-account",
    "private_key_id": "4a597ba1d01148b2a42077077d65e880e257c874",
    "apiKey": "AIzaSyBIKe1J97Q8AqIRsgWuL1gBUDYLotgEjOQ",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYODAcsZMKlc4t\noKQxweyLFwet/XwDqrHKR+cqwjVgIwlHO04gH3O3Xj6H0rcUNAO1zpLqkXxi/HJq\nue0BNSEq2nJ4YRJbI/os6HxPGSI8x5T05ve3Cq0oRVMhkIQNF73pkKuHBCI2oQMB\nt0l01rtzy+awMjJtB6ddmTDHgGiYc6v+bLPhI86V+t0naJEyzhnGGDJm2FwDgzSN\ncP+D0QdkxYjvt9wUZ8OMo6JRH2PrcY0mGyLHeySL0EydwgV7MwO8nN0bFyevDu9X\n9YE6CUUBU2NWz6aICV/KHxVx68qc6pYhfVgNxCa11ifXUHWJQR7p11GRwHnWDfOj\nYC/cmv4PAgMBAAECggEAG+V386PHhGSaktF4jcDm63UftQeQ4go6YQ5Q2XfwGgS7\nNDkHFebo754VtEFwBIfHeMP7uY7mvQC0JGfzl6XKrzQ686QWkbK9GuEt9KiZ/byE\nT+qiyDd06s6y8JAsMWJASuuy7bsPTPwOHsEOlagEzGZgz5fSYLXNlqpmnD7Jf+2j\nt9PR/mVXDPgVC1RaaZjeo0qyndanMEz1xygczEwKlAKKZ8cnTyUrYgIF5YqjrczB\n5580cON9FZJhbWhwhq9djEjTZJx68vZuME19EIzFMiF5fV3RntgzLzHKHNiYGmo1\nI6xV+3s5wFYEyTeayPedAAaXA8PeTExtMeEMTJt75QKBgQD/XcTqrSF++34/OBOH\ndC8Uy9aKbE0/33Yy2jSDXMvf/8gWAIRq2agY3F22Wa4b6YJXL87tzJaToQ38D29x\nZe+5yj78W4cE/dKuVHHEZMidxkaQ30YsOfxSsft0E2W4HzztavIncWGwSYzeovjK\nPTAwiQXmaSskx5Pk8du594q97QKBgQDYwYyeVzmoScBcAuDoFDvMIRNSQCuePSUu\nBVk36ae9l8oxqhvmY59FOlHxu3MAFqFN1qfhmME8EPf2yybBdpa87lgDnPny5zTN\nK4yocNyg5+v4B4GD+SG+eGcqyeBu1TpChP9eslva993Fip4fJYr1zok9MEbqRHuO\nZ3Rg5MCMawKBgB7gQ5LsZARqfBVAvnu+PIMTMlmCRsTWTABSCc9oRO5MivC+F0Sk\nFIMNAfeuWDLfxPatvSNbfUlUS9CSPTNE0/tuzLbOikC8P+D8LNVGKkuJUbbqiB2I\n1U1aX8DlJ4Nfo4pBSA4k017xRasVoWcyhsUXjDMTvDeyOduQsrSFjazxAoGACYCK\nopJeU7NP/Hif1Wy1pmA40Z1AjEJP8/GGFL5ofRY/Zef4KyRo4gcJephmFTXowlnL\nqEcjCXgQ9r+3JjoFp6inMRlbl7ttBCWJmATCl0czf/8MPXXZddkfZK/O5+zvDeV4\nsHUPM80z6qoF/oWNzvLL72PDaBeydu6wGmNM0ZsCgYEApPGDGwVDgbUyYPHxIl44\nSwmm+0hRczIxoHStbFr2PHrRbgzzN2rw7tCKVkasleSLTwYcZ/+uMFdalfHzBQPt\niVfewCTScOuFnuIAeuLlUYi/zURkHUGao8eERsZSqKRpQooGktbKYoO7+4dOjNE/\nSz1RiLUPMb7JEPGaXjjYf08=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ok41a@ppp-dnc-account.iam.gserviceaccount.com",
    "client_id": "110578434624799403613",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ok41a%40ppp-dnc-account.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }

firebase.initializeApp(serviceAccountJSON);


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

export const loginUser = asyncHandler(async (req: any, res: any, next: any) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then( (userCredential:any) => {
        // User is authenticated
        const user = userCredential.user;
        console.log(`User ${user.email} is authenticated`);
        res.status(200).json(user);
    })
    .catch( (error: any) => {
        // Authentication failed
        console.error('Authentication failed:', error);
    });
})

export const getUserById = asyncHandler(async (req: any, res: any, next: any) => {
    const userId = req.params.userId;
    db.collection(userCollection).doc(userId).get()
        .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
        })
        .catch((error) => res.status(500).send(error));
})
