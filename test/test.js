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
const myAdminId = "adminId1"
const myAdminAuth = {uid: myAdminId, admin: true};
const myDriverId = "driverId1"
const myDriverAuth = {uid: myDriverId, driver: true};

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

describe("The WSB app", ()=>{
    it("Understands basic addition", () => {
        assert.equal(2+2,4);
    });

// //BUS STOPS COLLECTION
//     const myBusStopAddress = "address1";
//     const myBusStopId = "id1";
//     const myBusStopName = "name1";
//     const myBusStopDoc = {address: myBusStopAddress, id: myBusStopId, name: myBusStopName};

//     //helper functions

//     async function createBusStopDoc() {
//         const admin = getAdminFirestore();
//         const busStopDoc = admin.collection("BusStops").doc(myBusStopId);
//         await busStopDoc.set(myBusStopDoc);
//     }

//     // Write tests:

//     it("Admin can create a bus stop with correct fields", async() =>{
//         const db = getFirestore(myAdminAuth);
//         const doc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertSucceeds(doc.set(myBusStopDoc));
//     });

//     it("Admin can update a bus stop document with correct fields", async() => {
//         createBusStopDoc();
//         const db = getFirestore(myAdminAuth);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertSucceeds(testDoc.update({address: 'new address'}));
//     });

//     it("Admin can delete a bus stop document", async() => {
//         createBusStopDoc();
//         const db = getFirestore(myAdminAuth);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertSucceeds(testDoc.delete());
//     });

//     it("Admin can't create a bus stop with incorrect fields", async() =>{
//         const db = getFirestore(myAdminAuth);
//         const doc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(doc.set({id: myBusStopId, name: myBusStopName}));
//     });

//     it("Non-admin can't create a bus stop", async() => {
//         const db = getFirestore(myAuth);
//         const doc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(doc.set(myBusStopDoc));
//     });

//     it("Non-admin can't update a bus stop document with correct fields", async() => {
//         createBusStopDoc();
//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(testDoc.update({address: 'new address'}));
//     });

//     it("Non-admin can't delete a bus stop", async() => {
//         createBusStopDoc();
//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(testDoc.delete());
//     });
    
//     it("Unauth user can't create a bus stop", async() => {
//         const db = getFirestore(null);
//         const doc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(doc.set(myBusStopDoc));
//     });

//     it("Unauth user can't update a bus stop", async() => {
//         createBusStopDoc();
//         const db = getFirestore(null);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(testDoc.update({address: 'new address'}));
//     });

//     it("Unauth user can't delete a bus stop", async() => {
//         createBusStopDoc();
//         const db = getFirestore(null);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(testDoc.delete());
//     });


//     //Read Tests:

//     it("Auth user can get bus stop document", async() => {
//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertSucceeds(testDoc.get());
//     });

//     it("Auth user can list bus stop documents", async() => {
//             const db = getFirestore(myAuth);
//             const testRef = db.collection("BusStops");
//             await firebase.assertSucceeds(testRef.get());
//     });

//     it("Unauth user can't get bus stop documents", async() => {
//         const db = getFirestore(null);
//         const testDoc = db.collection("BusStops").doc(myBusStopId);
//         await firebase.assertFails(testDoc.get());
//     });

//     it("Unauth user can't list bus stop documents", async() => {
//         const db = getFirestore(null);
//         const testRef = db.collection("BusStops");
//         await firebase.assertFails(testRef.get());
//     });

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

    async function createJacketDoc(jacketDoc) {
        const admin = getAdminFirestore();
        const testDoc = admin.collection("Jackets").doc(myJacketIdentifier);
        await testDoc.set(jacketDoc);
    }
    // //Write Tests:

    it("Admin can create jacket doc with correct fields", async() => {
        const db = getFirestore(myAdminAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertSucceeds(testDoc.set(myJacketDoc));
    });

    it("Admin can update jacket doc with correct fields", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(myAdminAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertSucceeds(testDoc.set({identifier: 'NewId'}));    
    });

    it("Admin can't create jacket doc with incorrect fields", async() => {
        const db = getFirestore(myAdminAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set(myInvalidJacketDoc));
    });

    it("Admin can't update jacket doc with incorrect fields", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(myAdminAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set({name: 'NewId'}));    
    });

    it("Admin can delete jacket doc", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(myAdminAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertSucceeds(testDoc.delete());   
    });

    it("Non-admin auth can't create jacket doc", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set(myJacketDoc));
    });

    it("Non-admin auth can't update jacket doc", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(myAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set({identifier: 'NewId'})); 
    });

    it("Non-admin auth can't delete jacket doc", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(myAuth);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.delete());   
    });

    it("Unauth can't create jacket doc", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set(myJacketDoc));
    });

    it("Unauth can't update jacket doc", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(null);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.set({identifier: 'NewId'})); 
    });

    it("Unauth can't delete jacket doc", async() => {
        createJacketDoc(myJacketDoc);
        const db = getFirestore(null);
        const testDoc = db.collection("Jackets").doc(myJacketIdentifier);
        await firebase.assertFails(testDoc.delete()); 
    });

    // //Read Tests:
    
    // it("Auth user can get jacket doc", async() => {

    // });

    // it("Unauth user can't get jacket doc", async() => {

    // });

    // it("Auth user can list jacket docd", async() => {

    // });

    // it("Unauth user can't list jacket docs", async() => {

    // });

























//REDO THESE:


//     it("Unauthorised user cannot read documents in Children collection", async() => {
//         const db = getFirestore(null);
//         const testDoc = db.collection("Children").doc("testDoc");
//         await firebase.assertFails(testDoc.get());
//     });

//     //TODO: edit child docs to have parentId as a field
//     it("Can read to a child document with the same parent id as the user", async() => {
//         const admin = getAdminFirestore();
//         const childId = "myChildId";
//         const childDoc = admin.collection("Children").doc(childId);
//         await childDoc.set({parentId: myParentId});
        
//         const db = getFirestore(myParentAuth);
//         const testWrite = db.collection("Children").doc(childId);
//         await firebase.assertSucceeds(testWrite.get());
//     });

//     it("Can't read a child document with a different parent id than the user", async() => {
//         const admin = getAdminFirestore();
//         const childId = "theirChildId";
//         const childDoc = admin.collection("Children").doc(childId);
//         await childDoc.set({parentId: theirParentId});
        
//         const db = getFirestore(myParentAuth);
//         const testWrite = db.collection("Children").doc(childId);
//         await firebase.assertFails(testWrite.get());
//     });
//     it("Can write to a child document with the same parent id as the user", async() => {
//         const admin = getAdminFirestore();
//         const childId = "myChildId";
//         const childDoc = admin.collection("Children").doc(childId);
//         await childDoc.set({parentId: myParentId});
        
//         const db = getFirestore(myParentAuth);
//         const testWrite = db.collection("Children").doc(childId);
//         await firebase.assertSucceeds(testWrite.set({firstName: "NewName"}));
//     });

//     it("Can't write to a child document with a different parent id than the user", async() => {
//         const admin = getAdminFirestore();
//         const childId = "theirChildId";
//         const childDoc = admin.collection("Children").doc(childId);
//         await childDoc.set({parentId: theirParentId});
        
//         const db = getFirestore(myParentAuth);
//         const testWrite = db.collection("Children").doc(childId);
//         await firebase.assertFails(testWrite.set({firstName: "NewName"}));
//     });
 })