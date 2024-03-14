const functions = require('firebase-functions');
const admin = require('firebase-admin');
//const serviceAccount = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\server_details.json');
// Alternatively, you can use forward slashes
 const serviceAccount = require('C:/Users/niamh/OneDrive - University of Leeds/Level 3/GDP/WSBAppServer/server_details.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'http://localhost:8080'
// });
// if (process.env.FUNCTIONS_EMULATOR === 'true') {
//     admin.initializeApp({
//       credential: admin.credential.applicationDefault(),
//       databaseURL: 'http://localhost:8080',
//     });
//   } else {
//     admin.initializeApp();
//   }

const firestore = admin.firestore();

exports.importChildrenData = functions.https.onRequest(async (request, response) => {
    try {
      const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\children.json');
      //const data = require('./data/children.json');
      const batch = firestore.batch();
  
      data.Children.forEach((child) => {
        const { id, firstName, lastName, classCode, childContacts, parentId } = child;
  
        const childRef = firestore.collection('Children').doc(id);
        batch.set(childRef, {
          id,
          firstName,
          lastName,
          childContacts,
          classCode,
          parentId,
        });
      });
  
      await batch.commit();
      return response.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error importing data:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  });

  exports.importJacketsData = functions.https.onRequest(async (request, response) => {
    try {
      const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\jackets.json');
      //const data = require('./data/children.json');
      const batch = firestore.batch();
  
      data.Jackets.forEach((jacket) => {
        const { identifier } = jacket;
  
        const jacketRef = firestore.collection('Jackets').doc(identifier);
        batch.set(jacketRef, {
          identifier,
        });
      });
  
      await batch.commit();
      return response.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error importing data:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  });


  exports.importBusStopsData = functions.https.onRequest(async (request, response) => {
    try {
      const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStops.json');
      //const data = require('./data/children.json');
      const batch = firestore.batch();
  
      data.BusStops.forEach((busStopDoc) => {
        const { arrivalTime, busStop, address, longitude, latitude } = busStopDoc;
  
        const busStopRef = firestore.collection('BusStops').doc(busStop);
        batch.set(busStopRef, {
          arrivalTime, 
          busStop, 
          address, 
          longitude, 
          latitude
        });
      });
  
      await batch.commit();
      return response.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error importing data:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  });