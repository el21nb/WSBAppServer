const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://wsbapp3.firebaseio.com',
});

const firestore = admin.firestore();
const currentJourneyId = 'AppelbeesK102102024AM';
exports.importChildrenData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/children.json');
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

exports.importJacketsData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/jackets.json');
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


exports.importBusStopsData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/busStops.json');
    const batch = firestore.batch();

    data.BusStops.forEach((busStopDoc) => {
      const { name, id, address, longitude, latitude } = busStopDoc;

      const busStopRef = firestore.collection('BusStops').doc(id);
      batch.set(busStopRef, {
        name, 
        id, 
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

exports.importJourneysData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/journeys.json');
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

exports.importJourneyBusStopsData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/journeyBusStops.json');
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

async function importBusStopChildrenData2(busStopId) {
  try {
    const data = require('./data/busStopChildren.json');
    const children = data.busStopChildren[busStopId];

    if (!children) {
      console.warn(`No children data found for bus stop ${busStopId}`);
      return;
    }

    const batch = firestore.batch();
    const journeyBusStopRef = firestore.collection('Journeys').doc(currentJourneyId).collection('JourneyBusStops').doc(busStopId);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { id, firstName, lastName, classCode, childContacts, parentId } = child;
      const childRef = journeyBusStopRef.collection('busStopChildren').doc(id);

      batch.set(childRef, {
        id,
        firstName,
        lastName,
        classCode,
        childContacts,
        parentId
      });
    }

    await batch.commit();

    console.log(`Data imported successfully for bus stop ${busStopId}`);
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

exports.importAllBusStopChildrenData2 = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/busStopChildren.json');
    const busStopIds = Object.keys(data.busStopChildren);
    

    const promises = busStopIds.map(async (busStopId) => {
      await importBusStopChildrenData2(busStopId); // Call the standalone function
    });

    await Promise.all(promises);

    return response.status(200).json({ message: 'All bus stop children data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

exports.importTicketsData = functions.region('europe-west2').https.onRequest(async (request, response) => {
  try {
    const data = require('./data/tickets.json');
    const batch = firestore.batch();
    data.Tickets.forEach((ticketDoc) => {
      const { busStopId, childId, journeyId, pickUp, schoolTicket, ticketId, ownerId } = ticketDoc;
      const ticketRef = firestore.collection('Tickets').doc(ticketId);
      batch.set(ticketRef, {
        busStopId, 
        childId, 
        journeyId, 
        pickUp, 
        schoolTicket, 
        ticketId, 
        ownerId
      });
    });

    await batch.commit();
    return response.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});
