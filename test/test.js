const assert = require('assert');
const firebase = require('@firebase/testing');
const MY_PROJECT_ID = "wsbapp3";
const myParentId = "parentId1";
const myParentAuth = {uid: myParentId, parent: true};
const theirParentId = "parentId2";
const theirParentAuth = {uid: theirParentId, parent: true};
const myId = "user1";
const myAuth = {uid: myId};
const theirId = "user 2";
const theirAuth = {uid: theirId};
const myAdminId = "adminId1";
const myAdminAuth = {uid: myAdminId, admin: true};
const myDriverId = "driverId1";
const myDriverAuth = {uid: myDriverId, driver: true};
const theirDriverId = 'driverId2';
const theirDriverAuth = {uid: theirDriverId, driver: true};
const myStaffId = "staffId1";
const myStaffAuth = {uid: myStaffId, staff: true};

/**
 * Call for every fs test function. Pass in getFirestore(null) to test not logged in.
 * Pass in an auth object to test being logged in with different accounts
 * @param {C} auth 
 * @returns 
 */
function getFirestore(auth){
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth:auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

beforeEach(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
});



// //BUS STOPS COLLECTION
    const myBusStopAddress = "address1";
    const myBusStopId = "id1";
    const myBusStopName = "name1";
    const myBusStopDoc = {address: myBusStopAddress, id: myBusStopId, name: myBusStopName};

    //helper functions

    async function createBusStopDoc() {
        const admin = getAdminFirestore();
        const busStopDoc = admin.collection("BusStops").doc(myBusStopId);
        await busStopDoc.set(myBusStopDoc);
    }

//     // Write tests:

    // it("Admin can create a bus stop with correct fields", async() =>{
    //     const db = getFirestore(myAdminAuth);
    //     const doc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertSucceeds(doc.set(myBusStopDoc));
    // });

    // it("Admin can update a bus stop document with correct fields", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertSucceeds(testDoc.update({address: 'new address'}));
    // });

    // it("Admin can delete a bus stop document", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertSucceeds(testDoc.delete());
    // });

    // it("Admin can't create a bus stop with incorrect fields", async() =>{
    //     const db = getFirestore(myAdminAuth);
    //     const doc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(doc.set({id: myBusStopId, name: myBusStopName}));
    // });

    // it("Non-admin can't create a bus stop", async() => {
    //     const db = getFirestore(myAuth);
    //     const doc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(doc.set(myBusStopDoc));
    // });

    // it("Non-admin can't update a bus stop document with correct fields", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(testDoc.update({address: 'new address'}));
    // });

    // it("Non-admin can't delete a bus stop", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(testDoc.delete());
    // });
    
    // it("Unauth user can't create a bus stop", async() => {
    //     const db = getFirestore(null);
    //     const doc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(doc.set(myBusStopDoc));
    // });

    // it("Unauth user can't update a bus stop", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(testDoc.update({address: 'new address'}));
    // });

    // it("Unauth user can't delete a bus stop", async() => {
    //     createBusStopDoc();
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(testDoc.delete());
    // });


    // //Read Tests:

    // it("Auth user can get bus stop document", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Auth user can list bus stop documents", async() => {
    //         const db = getFirestore(myAuth);
    //         const testRef = db.collection("BusStops");
    //         await firebase.assertSucceeds(testRef.get());
    // });

    // it("Unauth user can't get bus stop documents", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("BusStops").doc(myBusStopId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Unauth user can't list bus stop documents", async() => {
    //     const db = getFirestore(null);
    //     const testRef = db.collection("BusStops");
    //     await firebase.assertFails(testRef.get());
    // });

    //CHILD COLLECTION
    const myChildId = "id1";
    const myClassCode = "code1"
    const myFirstName = "firstName1";
    const myLastName = "lastName1";
    const myContact = {contactDetail: "contactDetail1", name: "name1"};
    const myChildDoc = {childContacts: myContact, classCode: myClassCode, firstName: myFirstName, id: myChildId, parentId: myParentId, lastName: myLastName};
    const theirChildDoc = {childContacts: myContact, classCode: myClassCode, firstName: myFirstName, id: myChildId, parentId: theirParentId, lastName: myLastName};
    const myInvalidChildDoc = {childContacts: myContact, classCode: myClassCode, firstName: myFirstName};


    //helper functions

    async function createChildDoc() {
        const admin = getAdminFirestore();
        const childDoc = admin.collection("Children").doc(myChildId);
        await childDoc.set(myChildDoc);
    }

    //Write Tests:
    // it("Admin can create a child doc with correct fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const doc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(doc.set(myChildDoc));
    // });

    // it("Admin can't create a child doc with incorrect fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const doc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(doc.set(myInvalidChildDoc));
    // });

    // it("Admin can update a child doc with correct fields", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.update({classCode: 'new code'}));
    // });

    

    // it("Admin can't update a child doc with incorrect fields", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.update({randomField: 'random'}));
    // });

    // it("Admin can delete a child doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.delete());
    // });

    // it("Parent can create their child's doc with correct fields", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.set(myChildDoc));
    // });

    // it("Parent can update their child's doc with correct fields", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.update({firstName: 'Newname'}));
    // });

    // it("Parent can delete their child's doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.update({firstName: 'Newname'}));
    // });

    // it("Parent can't create someone else's child's doc", async() => {
    //     const db = getFirestore(theirParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.set(myChildDoc));
    // });

    // it("Parent can't update someone else's child's doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(theirParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.update({firstName: 'Newname'}));
    // });

    // it("Parent can't delete someone else's child's doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(theirParentAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Non-admin, non-parent can't update a child doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.update({firstName: 'Newname'}));
    // });

    // it("Non-admin, non-parent can't delete a child doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Unauth user can't create a child doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.set(myChildDoc));
    // });

    // it("Unauth user can't update a child doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.update({firstName: 'Newname'}));
    // });

    // it("Unauth user can't delete a child doc", async() => {
    //     createChildDoc();
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // // //Read Tests:
    
    // it("Admin can list child docs", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testRef = db.collection("Children");
    //     await firebase.assertSucceeds(testRef.get());
    // });



    // it("Driver can list child docs", async() => {
    //     const db = getFirestore(myDriverAuth);
    //     const testRef = db.collection("Children");
    //     await firebase.assertSucceeds(testRef.get());
    // });

    // it("Non-admin, non-driver auth user can't list child docs", async() => {
    //     const db = getFirestore(myAuth);
    //     const testRef = db.collection("Children");
    //     await firebase.assertFails(testRef.get());
    // });

    // it("Unauth user can't list child docs", async() => {
    //     const db = getFirestore(null);
    //     const testRef = db.collection("Children");
    //     await firebase.assertFails(testRef.get());
    // });

    // it("Admin can get child doc", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Driver can get child doc", async() => {
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Parent can get their child's doc", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testQuery = db.collection("Children").where("parentId", "==", myParentId);
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Parent can't get someone else's child's doc", async() => {
    //     const db = getFirestore(theirParentAuth);
    //     const testQuery = db.collection("Children").where("parentId", "==", myParentId);
    //     await firebase.assertFails(testQuery.get());
    // });

    // it("Non-parent, non-driver, non-admin auth user can't get child doc", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Unauth user can't get child doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Children").doc(myChildId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // //JACKETS COLLECTION
   
    const myJacketIdentifier = "JA1";
    const myJacketDoc = {identifier: myJacketIdentifier};
    const myInvalidJacketDoc = {name: myJacketIdentifier};


    //helper functions

    // async function createJacketDoc(jacketDoc) {
    //     const admin = getAdminFirestore();
    //     const testDoc = admin.collection("Jackets").doc(myJacketIdentifier);
    //     await testDoc.set(jacketDoc);
    // }
    // // //Write Tests:

    // it("Admin can create jacket doc with correct fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertSucceeds(testDoc.set(myJacketDoc));
    // });

    // it("Admin can update jacket doc with correct fields", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertSucceeds(testDoc.set({identifier: 'NewId'}));    
    // });

    // it("Admin can't create jacket doc with incorrect fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set(myInvalidJacketDoc));
    // });

    // it("Admin can't update jacket doc with incorrect fields", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set({name: 'NewId'}));    
    // });

    // it("Admin can delete jacket doc", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertSucceeds(testDoc.delete());   
    // });

    // it("Non-admin auth can't create jacket doc", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set(myJacketDoc));
    // });

    // it("Non-admin auth can't update jacket doc", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set({identifier: 'NewId'})); 
    // });

    // it("Non-admin auth can't delete jacket doc", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.delete());   
    // });

    // it("Unauth can't create jacket doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set(myJacketDoc));
    // });

    // it("Unauth can't update jacket doc", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.set({identifier: 'NewId'})); 
    // });

    // it("Unauth can't delete jacket doc", async() => {
    //     createJacketDoc(myJacketDoc);
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.delete()); 
    // });

    // // //Read Tests:
    
    // it("Auth user can get jacket doc", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Unauth user can't get jacket doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Auth user can list jacket docd", async() => {
    //     const db = getFirestore(myAuth);
    //     const testQuery = db.collection("Jackets");
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Unauth user can't list jacket docs", async() => {
    //     const db = getFirestore(null);
    //     const testQuery = db.collection("Jackets");
    //     await firebase.assertFails(testQuery.get());
    // });
    //TODO: add ownerId field to Ticket object
    
    //TICKETS COLLECTION

    //Write tests:

    const myJourneyId = "journeyId1";
    const myPickUp = true;
    const mySchoolTicket = false;
    const myTicketId = "ticketId1";
    const myOwnerId = "ownerId1";

    function newTicketDocument(ticketOwnerId){
        return ticketDoc = {busStopId: myBusStopId, childId: myChildId, journeyId: myJourneyId, ownerId: ticketOwnerId, pickUp: myPickUp, schoolTicket: mySchoolTicket, ticketId: myTicketId};
    }

    async function createTicketDoc(ticketOwnerId) {
        const admin = getAdminFirestore();
        const busStopDoc = admin.collection("Tickets").doc(myTicketId);
        const myTicketDoc = {busStopId: myBusStopId, childId: myChildId, journeyId: myJourneyId, ownerId: ticketOwnerId, pickUp: myPickUp, schoolTicket: mySchoolTicket, ticketId: myTicketId};
        await busStopDoc.set(myTicketDoc);
    }
    

    // it("admin can create ticket doc with correct fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.set(newTicketDocument("ownerId")));
   
    // });

    // it("admin can't create ticket doc with incorrect fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     const invalidTicketDoc = {busStopId: myBusStopId, childId: myChildId};
    //     await firebase.assertFails(testDoc.set(invalidTicketDoc));
   
    // });

    // it("admin can update ticket doc with correct fields", async() => {
    //     createTicketDoc(myAdminId);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.update({busStopId: 'newId'}));
    // });

    // it("admin can delete ticket doc with correct fields", async() => {
    //     createTicketDoc(myAdminId);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.delete());
   
    // });

    // it("Parent can create their own ticket doc with correct fields", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.set(newTicketDocument(myParentId)));
   
    // });

    // it("Parent can't create someone else's ticket", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(theirParentId)));

    // });

    // it("Parent can update their own ticket doc", async() => {
    //     createTicketDoc(myParentId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.update({busStopId: 'newStopId'}));
   
    // });

    // it("Parent can delete their own ticket doc", async() => {
    //     createTicketDoc(myParentId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.delete());
    // });

    // it("Parent can't update someone else's ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.update({busStopId: 'newStopId'}));
   
    // });
    // it("Parent can't delete someonee else's ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.delete());

    // });

    // it("Staff can create their own ticket doc with correct fields", async() => {
    //     const db = getFirestore(myStaffAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.set(newTicketDocument(myStaffId)));
   
    // });

    // it("Staff can't create someone else's ticket", async() => {
    //     const db = getFirestore(myStaffAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(theirParentId)));
    // });

    // it("Staff can't delete someonee else's ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(myStaffAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Auth user can't create their own ticket doc with correct fields", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(myId)));
   
    // });

    // it("Auth user can't create someone else's ticket", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(theirParentId)));
    // });

    // it("Auth user can't delete someonee else's ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Unauth user can't create their own ticket doc with correct fields", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(myId)));
   
    // });

    // it("Unauth user can't create someone else's ticket", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.set(newTicketDocument(theirParentId)));
    // });

    // it("Unauth user can't delete someonee else's ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // //READ TESTS

    // it("Admin can list ticket docs", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Driver can list ticket docs", async() => {
    //     const db = getFirestore(myDriverAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Staff can list their own ticket docs", async() => {
    //     const db = getFirestore(myStaffAuth);
    //     const testQuery = db.collection("Tickets").where("ownerId", "==", myStaffId);
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Parents can list their own ticket docs", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testQuery = db.collection("Tickets").where("ownerId", "==", myParentId);
    //     await firebase.assertSucceeds(testQuery.get());
    // });

    // it("Staff can't list others' ticket docs", async() => {
    //     const db = getFirestore(myStaffAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertFails(testQuery.get());
    // });

    // it("Parents can't list others' ticket docs", async() => {
    //     const db = getFirestore(myParentAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertFails(testQuery.get());
    // });

    // it("Auth user can't list ticket docs", async() => {
    //     const db = getFirestore(myAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertFails(testQuery.get());
    // });

    // it("Unauth user can't list ticket docs", async() => {
    //     const db = getFirestore(myAuth);
    //     const testQuery = db.collection("Tickets");
    //     await firebase.assertFails(testQuery.get());
    // });

    // it("Admin can get ticket doc", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Driver can get ticket doc", async() => {
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertSucceeds(testDoc.get());
    // });

    // it("Staff can't get others' ticket doc", async() => {
    //     createTicketDoc(myParentId);
    //     const db = getFirestore(myStaffAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Parents can't get others' ticket doc", async() => {
    //     createTicketDoc(theirParentId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Auth user can't get ticket doc", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.get());
    // });

    // it("Unauth user can't get ticket doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Tickets").doc(myTicketId);
    //     await firebase.assertFails(testDoc.get());
    // });
        
//JOURNEYS COLLECTION
    const myOutwardJourney = true;
    const myDriverContact = {contactDetail: "123456789", name: "driverName1"};
    const myJourneyDateTime = '09:00 01/01/2021';


    //helper functions
    function newJourneyDoc(thisDriverId) {
        return journeyDoc = {OutwardJourney: myOutwardJourney, driverContact: myDriverContact, id: myJourneyId, journeyDateTime: myJourneyDateTime, driverId: thisDriverId};
    }
    
    async function createJourneyDoc(thisDriverId) {
        const admin = getAdminFirestore();
        const journeyDoc = admin.collection("Journeys").doc(myJourneyId);
        await journeyDoc.set(newJourneyDoc(thisDriverId));
    }


    // //Write Tests:
    // it("Admin can create a journey doc with correct fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertSucceeds(testDoc.set(newJourneyDoc(myDriverId)));
    // });

    // it("Admin can't create a journey doc with incorrect fields", async() => {
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.set({OutwardJourney: myOutwardJourney, driverContact: myDriverContact}));
    // });

    // it("Admin can update a journey doc with correct fields", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertSucceeds(testDoc.update({journeyDateTime: 'new time'}));
    // });

    // it("Admin can't update a journey doc with incorrect fields", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({randomField: 'random'}));
    // });

    // it("Auth user can't create a journey Doc", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.set(newJourneyDoc(myDriverId)));
    // });

    // it("Parent/Driver/Staff can't create a journey Doc", async() => {
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.set(newJourneyDoc(myDriverId)));
    // });

    // it("Unauth user can't create a journey Doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.set(newJourneyDoc(myDriverId)));
    // });

    // it("Driver can update their journey Doc with correct fields", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertSucceeds(testDoc.update({journeyDateTime: 'new time'}));
    // });

    // it("Driver can't update their journey Doc with incorrect fields", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({randomField: 'new time'}));
    // });

    // it("Driver can't update someone else's journey Doc", async() => {
    //     createJourneyDoc(theirDriverId);
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({journeyDateTime: 'new time'}));
    // });


    // it("Auth user can't update a journey Doc", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({journeyDateTime: 'new time'}));
    // });

    // it("Parent/Staff can't update a journey Doc", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myParentAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({journeyDateTime: 'new time'}));
    // });

    // it("Unauth user can't create a update Doc", async() => {
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.update({journeyDateTime: 'new time'}));
    // });

    // it("Driver can't delete their journey Doc", async() => {
    //     createJourneyDoc(myDriverId);
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Driver can't delete someone elses journey Doc", async() => {
    //     createJourneyDoc(theirDriverId);
    //     const db = getFirestore(myDriverAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Admin can't delete a journey Doc", async() => {
    //     createJourneyDoc(theirDriverId);
    //     const db = getFirestore(myAdminAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // it("Auth user can't delete a journey Doc", async() => {
    //     createJourneyDoc(theirDriverId);
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.delete());
    // });
    
    // it("Unauth user can't delete a journey Doc", async() => {
    //     createJourneyDoc(theirDriverId);
    //     const db = getFirestore(null);
    //     const testDoc = db.collection("Journeys").doc(myJourneyId);
    //     await firebase.assertFails(testDoc.delete());
    // });

    // //READ TESTS

    // it("Auth user can get journey document", async() => {
    //         const db = getFirestore(myAuth);
    //         const testDoc = db.collection("Journeys").doc(myJourneyId);
    //         await firebase.assertSucceeds(testDoc.get());
    //     });
    
    //     it("Auth user can list journey documents", async() => {
    //         const db = getFirestore(myAuth);
    //         const testRef = db.collection("Journeys");
    //         await firebase.assertSucceeds(testRef.get());
    //     });
    
    //     it("Unauth user can't get journey documents", async() => {
    //         const db = getFirestore(null);
    //         const testDoc = db.collection("Journeys").doc(myJourneyId);
    //         await firebase.assertFails(testDoc.get());
    //     });
    
    //     it("Unauth user can't list journey documents", async() => {
    //         const db = getFirestore(null);
    //         const testRef = db.collection("Journeys");
    //         await firebase.assertFails(testRef.get());
    //     });

//PASSENGERS SUBCOLLECTION
const myPassengerDoc = {Child: myChildDoc, parentId: myParentId, Jacket: 'JA01', JacketAssignTime: 'assign time', JacketDeassignTime: null, pickUpTime: 'pick up time', dropOffTime: null};


//helper functions

async function createChildDoc() {
    const admin = getAdminFirestore();
    const childDoc = admin.collection("Children").doc(myChildId);
    await childDoc.set(myChildDoc);
}

//Write Tests:
//helper functions
function newChildDoc(thisParentId) {
    return childDoc = {childContacts: myContact, classCode: myClassCode, firstName: myFirstName, id: myChildId, parentId: thisParentId, lastName: myLastName};
}

function newPassengerDoc(thisParentId){
    return passengerDoc = {Child: newChildDoc(thisParentId), parentId: thisParentId, Jacket: 'JA01', JacketAssignTime: 'assign time', JacketDeassignTime: null, pickUpTime: 'pick up time', dropOffTime: null};
}

async function createPassengerDoc(thisParentId) {
    const admin = getAdminFirestore();
    const passengerDoc = admin.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
    await passengerDoc.set(newPassengerDoc(thisParentId));
}


//Write Tests

// it("Driver can create a passenger document on their journey with correct Fields", async() => {
//     createJourneyDoc(myDriverId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertSucceeds(testDoc.set(newPassengerDoc(myParentId)));
// });

// it("Driver can't create a passenger doc with incorrect fields", async() => {
//     createJourneyDoc(myDriverId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.set({childContacts: myContact, classCode: myClassCode}));
// });

// it("Driver can update a passenger document on their journey with correct Fields", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertSucceeds(testDoc.update({JacketAssignTime: 'New time'}));
// });

// it("Driver can't update a passenger doc with incorrect fields", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.update({RandomField: 'New time'}));
// });

// it("Driver can't create a passenger document someone elses journey", async() => {
//     createJourneyDoc(myDriverId);
//     const db = getFirestore(theirDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.set(newPassengerDoc(myParentId)));
// });

// it("Driver can't update a passenger doc on someone else's journey ", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(theirDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.update({RandomField: 'New time'}));
// });


// it("Auth user can't create a passenger document someone elses journey", async() => {
//     createJourneyDoc(myDriverId);
//     const db = getFirestore(myAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.set(newPassengerDoc(myParentId)));
// });

// it("Auth can't update a passenger doc on someone else's journey ", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(myAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.update({RandomField: 'New time'}));
// });

// it("Unauth user can't create a passenger document someone elses journey", async() => {
//     createJourneyDoc(myDriverId);
//     const db = getFirestore(null);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.set(newPassengerDoc(myParentId)));
// });

// it("Unauth can't update a passenger doc on someone else's journey ", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(null);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.update({RandomField: 'New time'}));
// });

// it("Driver can't delete a passenger document on their journey", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.delete());
// });

// it("Admin can't delete a passenger document", async() => {
//     createJourneyDoc(myDriverId);
//     createPassengerDoc(myParentId);
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.delete());
// });

// it("Auth user can't delete a passenger document", async() => {
//     const db = getFirestore(myAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.delete());
// });

// it("Auth user can't delete a passenger document", async() => {
//     const db = getFirestore(null);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertFails(testDoc.delete());
// });

// //Read tests:

// it("Admin can get a passenger document", async() =>  {
//     const db = getFirestore(myAdminAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertSucceeds(testDoc.get());
// });

// it("Staff can get a passenger document", async() =>  {
//     const db = getFirestore(myStaffAuth);
//     const testDoc = db.collection("Journeys").doc(myJourneyId).collection("Passengers").doc(myChildId);
//     await firebase.assertSucceeds(testDoc.get());
// });

// it("Parent can get their child's passenger document", async() =>  {
//     const admin = getAdminFirestore();
//     const passengerPath = "/Journeys/journeyId1/Passengers/id1";
//     await admin.doc(passengerPath).set(myPassengerDoc);

//     const db = getFirestore(myParentAuth);
//     const testDoc = db.doc(passengerPath);
//     await firebase.assertSucceeds(testDoc.get());
// });

// it("Parent can't get someone else's child's passenger document", async() =>  {
//     const admin = getAdminFirestore();
//     const passengerPath = "/Journeys/journeyId1/Passengers/id1";
//     await admin.doc(passengerPath).set(myPassengerDoc);
    
//     const db = getFirestore(theirParentAuth);
//     const testDoc = db.doc(passengerPath);
//     await firebase.assertFails(testDoc.get());
// });

// it("Driver can get a passenger document from their journey", async() =>  {
//     const admin = getAdminFirestore();
//     const journeyPath = "/Journeys/journeyId1";
//     await admin.doc(journeyPath).set(newJourneyDoc(myDriverId));
//     const passengerPath = "/Journeys/journeyId1/Passengers/id1";
//     await admin.doc(passengerPath).set(newPassengerDoc(myParentId));
    
//     const db = getFirestore(myDriverAuth);
//     const testDoc = db.doc(passengerPath);
//     await firebase.assertSucceeds(testDoc.get());
// });

// it("Driver can't get a passenger document from someone else's journey", async() =>  {
//     const admin = getAdminFirestore();
//     const journeyPath = "/Journeys/journeyId1";
//     await admin.doc(journeyPath).set(newJourneyDoc(myDriverId));
//     const passengerPath = "/Journeys/journeyId1/Passengers/id1";
//     await admin.doc(passengerPath).set(newPassengerDoc(myParentId));
    
//     const db = getFirestore(theirDriverAuth);
//     const testDoc = db.doc(passengerPath);
//     await firebase.assertFails(testDoc.get());
// });

// it("Admin can list a passenger documents", async() =>  {
//     const db = getFirestore(myAdminAuth);
//     const testRef = db.collection("Journeys").doc(myJourneyId).collection("Passengers");
//     await firebase.assertSucceeds(testRef.get());
// });

// it("Staff can list passenger documents", async() =>  {
//     const db = getFirestore(myStaffAuth);
//     const testQuery = db.collection("/Journeys/journeyId1/Passengers").where("parentId", "==", myParentId);
//     await firebase.assertSucceeds(testQuery.get());
// });

// it("Parent can list their childrens' passenger document", async() =>  {
//     const db = getFirestore(myParentAuth);
//     const testQuery = db.collection("/Journeys/journeyId1/Passengers").where("parentId", "==", myParentId);
//     await firebase.assertSucceeds(testQuery.get());
// });

// it("Parent can't list someone else's childrens' passenger documents", async() => {
//     const db = getFirestore(theirParentAuth);
//     const testQuery = db.collection("/Journeys/journeyId1/Passengers").where("parentId", "==", myParentId);
//     await firebase.assertFails(testQuery.get());
// });

// it("Driver can list passenger documents from their journey", async() =>  {
//     const admin = getAdminFirestore();
//     const journeyPath = "/Journeys/journeyId1";
//     await admin.doc(journeyPath).set(newJourneyDoc(myDriverId));
    
//     const db = getFirestore(myDriverAuth);
//     const testRef = db.collection("/Journeys/journeyId1/Passengers");
//     await firebase.assertSucceeds(testRef.get());
// });

// it("Driver can't list passenger documents from someone else's journey", async() =>  {
//     const admin = getAdminFirestore();
//     const journeyPath = "/Journeys/journeyId1";
//     await admin.doc(journeyPath).set(newJourneyDoc(myDriverId));
    
//     const db = getFirestore(theirDriverAuth);
//     const testRef = db.collection("/Journeys/journeyId1/Passengers");
//     await firebase.assertFails(testRef.get());
// });

// it("Auth user can't list someone else's childrens' passenger documents", async() => {
//     const db = getFirestore(myAuth);
//     const testQuery = db.collection("/Journeys/journeyId1/Passengers").where("parentId", "==", myParentId);
//     await firebase.assertFails(testQuery.get());
// });

// it("Unauth user can't list someone else's childrens' passenger documents", async() => {
//     const db = getFirestore(null);
//     const testQuery = db.collection("/Journeys/journeyId1/Passengers").where("parentId", "==", myParentId);
//     await firebase.assertFails(testQuery.get());
// });


//JourneyBusStops subcollection

const myJourneyBusStopDoc = {arrivalTime: '09:00', busStop: myBusStopDoc};

//helper functions
//Write Tests:
//helper functions

async function createJourneyBusStopDoc(thisParentId) {
    const admin = getAdminFirestore();
    const passengerDoc = admin.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await passengerDoc.set(myJourneyBusStopDoc);
}
//Write tests:

it("Admin can create a bus stop doc with correct fields", async() => {
    const db = getFirestore(myAdminAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertSucceeds(testDoc.set(myJourneyBusStopDoc));
});

it("Admin can't create a bus stop doc with incorrect fields", async() => {
    const db = getFirestore(myAdminAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.set({random: 'rnd'}));
});

it("Auth user can't create a bus stop doc with correct fields", async() => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.set(myJourneyBusStopDoc));
});

it("Unauth user can't create a bus stop doc with correct fields", async() => {
    const db = getFirestore(null);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.set(myJourneyBusStopDoc));
});

it("Admin can update a bus stop doc with correct fields", async() => {
    createJourneyBusStopDoc();
    const db = getFirestore(myAdminAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertSucceeds(testDoc.update({arrivalTime: '10:00'}));
});

it("Admin can't update a bus stop doc with incorrect fields", async() => {
    createJourneyBusStopDoc();
    const db = getFirestore(myAdminAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.update({random: 'rnd'}));
});

it("Driver can update a bus stop doc on their journey with correct fields", async() => {
    createJourneyDoc(myDriverId);
    createJourneyBusStopDoc();
    const db = getFirestore(myDriverAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertSucceeds(testDoc.update({arrivalTime: '10:00'}));
});

it("Driver can't update a bus stop doc on someone elses journey", async() => {
    createJourneyDoc(myDriverId);
    createJourneyBusStopDoc();
    const db = getFirestore(theirDriverAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.update({arrivalTime: '10:00'}));
});


it("Auth user can't create a bus stop doc with correct fields", async() => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.set(myJourneyBusStopDoc));
});

it("Unauth user can't create a bus stop doc with correct fields", async() => {
    const db = getFirestore(null);
    const testDoc = db.collection('Journeys').doc(myJourneyId).collection('JourneyBusStops').doc(myBusStopId);
    await firebase.assertFails(testDoc.set(myJourneyBusStopDoc));
});



