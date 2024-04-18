const functions = require('firebase-functions');
const admin = require('firebase-admin');

import {
    onDocumentWritten,
    onDocumentCreated,
    onDocumentUpdated,
    onDocumentDeleted,
    Change,
    FirestoreEvent
  } from "firebase-functions/v2/firestore";

  exports.myfunction = onDocumentCreated("Statuses/{docId}", (event) => {
    const status = event.data();
    const title = status.title;
    if (!status) {
        console.log("No data associated with the event");
        return;
    }
    const data = {
        notification: {
            title: "New status update: ",
            body: title
        }        
    };
    return admin.messaging().sendToTopic('statuses', data);  });


exports.sendNotification = functions.firestore.document('Statuses/{statusId}')
    .onCreate((snap, context) => {
        const status = snap.data();
        const title = status.title;
        const message = status.message;

        const data = {
            notification: {
                title: "New status update",
                body: "'" + title + "'"
            }        
        };
        return admin.messaging().sendToTopic('statuses', data);
    });