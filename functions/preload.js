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

const currentJourneyId = 'AppelbeesK102102024AM';
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

exports.importJourneysData = functions.https.onRequest(async (request, response) => {
  try {
    const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\journeys.json');
    const batch = firestore.batch();
    data.Journeys.forEach((journeyDoc) => {
      const { outwardJourney, driverContact, id, journeyDateTime, driverId } = journeyDoc;
      const journeyRef = firestore.collection('Journeys').doc(id);
      batch.set(journeyRef, {
        outwardJourney,
        driverContact,
        id,
        journeyDateTime,
        driverId
      });
    });

    await batch.commit();
    return response.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

exports.importJourneyBusStopsData = functions.https.onRequest(async (request, response) => {
  try {
    const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\journeyBusStops.json');
    const batch = firestore.batch();
    data.JourneyBusStops.forEach((journeyBusStopsDoc) => {
      const { arrivalTime, busStop } = journeyBusStopsDoc;
      const journeyBusStopRef = firestore.collection('Journeys').doc(currentJourneyId).collection('JourneyBusStops').doc(busStop.id);
      batch.set(journeyBusStopRef, {
        arrivalTime,
        busStop
      });
    });

    await batch.commit();
    return response.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});
const { importBusStopChildrenData } = require('./preload');

exports.importAllBusStopChildrenData = functions.https.onRequest(async (request, response) => {
  try {
    const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');
    const busStopIds = Object.keys(data.busStopChildren);

    const promises = busStopIds.map(async (busStopId) => {
      // Call the importBusStopChildrenData function for each bus stop ID
      await importBusStopChildrenData(request, response, busStopId);
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    return response.status(200).json({ message: 'All bus stop children data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

exports.importBusStopChildrenData = functions.https.onRequest(async (request, response, busStopId) => {
  try {
    const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');
    const batch = firestore.batch();
    const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);
    const children = data.busStopChildren[busStopId];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { id, firstName, lastName, classCode, childContacts, parentId } = child;
      const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);

      // Add child data to the batch
      batch.set(childRef, {
        id,
        firstName,
        lastName,
        classCode,
        childContacts,
        parentId
      });
    }

    // Commit the batch operation for the journeyBusStopDocument
    await batch.commit();

    return response.status(200).json({ message: `Data imported successfully for bus stop ${busStopId}` });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});




// exports.importBusStopChildrenData = functions.https.onRequest(async (request, response) => {
//   try {
//     const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');

//     // Iterate through each bus stop and its children
//     Object.entries(data.busStopChildren).forEach(async ([busStopId, children]) => {
//       const batch = firestore.batch();
//       const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);

//       for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         const { id, firstName, lastName, classCode, childContacts, parentId } = child;
//         const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);

//         // Add child data to the batch
//         batch.set(childRef, {
//           id,
//           firstName,
//           lastName,
//           classCode,
//           childContacts,
//           parentId
//         });
//       }

//       // Commit the batch operation for each journeyBusStopDocument
//       await batch.commit();
//     });

//     return response.status(200).json({ message: 'Data imported successfully' });
//   } catch (error) {
//     console.error('Error importing data:', error);
//     return response.status(500).json({ error: 'Internal server error' });
//   }
// });


// exports.importBusStopChildrenData = functions.https.onRequest(async (request, response) => {
//   try {
//       const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');

//       // Iterate through each bus stop and its children
//       Object.entries(data.busStopChildren).forEach(async ([busStopId, children]) => {
//           const batch = firestore.batch();
//           const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);

//           // Iterate through each child and add it to the batch
//           children.forEach(child => {
//               const { id, firstName, lastName, classCode, childContacts, parentId } = child;
//               const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);
//               batch.set(childRef, {
//                   id,
//                   firstName,
//                   lastName,
//                   classCode,
//                   childContacts,
//                   parentId
//               });
//           });

//           // Commit the batch operation for each journeyBusStopDocument
//           await batch.commit();
//       });

//       return response.status(200).json({ message: 'Data imported successfully' });
//   } catch (error) {
//       console.error('Error importing data:', error);
//       return response.status(500).json({ error: 'Internal server error' });
//   }
// });

// exports.importBusStopChildrenData = functions.https.onRequest(async (request, response) => {
//   Object.entries(data.busStopChildren).forEach(async ([busStopId, children]) => {
//     const batch = firestore.batch();
//     const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);
  
//     for (let i = 0; i < children.length; i++) {
//       const child = children[i];
//       // ... rest of your code using child object
//     }
  
//     // ...
//   });


//   try {
//       const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');

//       // Iterate through each bus stop and its children
//       Object.entries(data.busStopChildren).forEach(async ([busStopId, children]) => {
//           const batch = firestore.batch();
//           const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);

//           // Iterate through each child and add it to the batch
//           children.forEach(child => {
//               const { id, firstName, lastName, classCode, childContacts, parentId } = child;
//               const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);
//               batch.set(childRef, {
//                   id,
//                   firstName,
//                   lastName,
//                   classCode,
//                   childContacts,
//                   parentId
//               });
//           });

//           // Commit the batch operation for each journeyBusStopDocument
//           await batch.commit();
//       });

//       return response.status(200).json({ message: 'Data imported successfully' });
//   } catch (error) {
//       console.error('Error importing data:', error);
//       return response.status(500).json({ error: 'Internal server error' });
//   }
// });


// });
// exports.importBusStopChildrenData = functions.https.onRequest(async (request, response) => {
//   try {
//     const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');
//     const batch = firestore.batch();

//     for (const [busStopId, children] of Object.entries(data.busStopChildren)) {
//       const journeyBusStopRef = firestore.collection('Journeys').doc(busStopId);

//       for (const child of children) {
//         const { id, firstName, lastName, classCode, childContacts, parentId } = child;
//         const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);
//         batch.set(childRef, {
//           id,
//           firstName,
//           lastName,
//           classCode,
//           childContacts,
//           parentId
//         });
//       }
//     }

//     await batch.commit();
//     return response.status(200).json({ message: 'Data imported successfully' });
//   } catch (error) {
//     console.error('Error importing data:', error);
//     return response.status(500).json({ error: 'Internal server error' });
//   }
// });


// try {
//   const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');
//   const batch = firestore.batch();
//   data.JourneyBusStops.forEach((busStopChildrenCollection) => {
//     const { arrivalTime, busStop } = journeyBusStopsDoc;
//     const journeyBusStopRef = firestore.collection('Journeys').doc(currentJourneyId).collection('JourneyBusStops').doc(busStop.id);
//     batch.set(journeyBusStopRef, {
//       arrivalTime,
//       busStop
//     });
//   });

//   try {
//     const data = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\data\\busStopChildren.json');
//     const batch = firestore.batch();
//     for (var journeyBusStopDoc in data.busStopChildren) {
//       for (var child in data.busStopChildren.journeyBusStopDoc) {
//         const { id, firstName, lastName, classCode, childContacts, parentId } = child;

//       }
//     }


//     data.busStopChildren.forEach(busStop => {
//       Object.entries(busStop).forEach([busStopId, children]) => {

//       }
//     })