const assert = require('assert');
const firebase = require('@firebase/testing');
const MY_PROJECT_ID = "wsbapp3"
describe("The WSB app", ()=>{
    it("Understands basic addition", () => {
        assert.equal(2+2,4);
    })

    it("Can read items in a top level collection", async() => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}). firestore();
        const testDoc = db.collection("Children").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })
})