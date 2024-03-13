const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('C:\\Users\\niamh\\OneDrive - University of Leeds\\Level 3\\GDP\\WSBAppServer\\server_details.json');
// Alternatively, you can use forward slashes
// const serviceAccount = require('C:/Users/niamh/OneDrive - University of Leeds/Level 3/GDP/WSBAppServer/server_details.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});

exports.addDriverRole = functions.https.onCall((data, context) => {
    // get user and add driver custom claim
    return driver.auth().getUserByEmail(data.email).then(user => {
      return driver.auth().setCustomUserClaims(user.uid, {
        driver: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an driver.`
      }
    }).catch(err => {
      return err;
    });
  });

  exports.addParentRole = functions.https.onCall((data, context) => {
    // get user and add driver custom claim
    return parent.auth().getUserByEmail(data.email).then(user => {
      return parent.auth().setCustomUserClaims(user.uid, {
        parent: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made an parent.`
      }
    }).catch(err => {
      return err;
    });
  });

  exports.addStaffRole = functions.https.onCall((data, context) => {
    // get user and add staff custom claim
    return staff.auth().getUserByEmail(data.email).then(user => {
      return staff.auth().setCustomUserClaims(user.uid, {
        staff: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been made staff.`
      }
    }).catch(err => {
      return err;
    });
  });

  const driversToCreate = [
    {    
        uid: 'AppelbeesK',
        displayName: 'Kristen Appelbees',
        email: 'appelbeesk@gmail.com',
        phoneNumber: '+111111111111',
        password: 'password'
    },
    {    
        uid: 'GooseT',
        displayName: 'Timothy Goose',
        email: 'gooset@gmail.com',
        phoneNumber: '+111222222222',
        password: 'password'
    },
    {    
        uid: 'KelmpE',
        displayName: 'Evan Kelmp',
        email: 'kelmpe@gmail.com',
        phoneNumber: '+111333333333',
        password: 'password'
    },
    {    
        uid: 'MooreM',
        displayName: 'Misty Moore',
        email: 'moorem@gmail.com',
        phoneNumber: '+111444444444',
        password: 'password'
    }
  ]

  async function createDrivers() {
    try {
      for (const driver of driversToCreate) {
        const driverRecord = await admin.auth().createUser(driver);
        console.log('Successfully created new driver:', driverRecord.uid);
  
        //add driver role
        await admin.auth().setCustomUserClaims(driverRecord.uid, { driver: true });
        console.log('Driver role added for driver:', driverRecord.uid);
      }
  
      console.log('All drivers created and driver roles added successfully');
    } catch (error) {
      console.error('Error creating drivers and adding driver roles:', error);
    }
  }
  
//createDrivers();

async function getAllUsersWithRoles() {
    try {
      const listUsersResult = await admin.auth().listUsers();
      const usersWithRoles = [];
      for (const userRecord of listUsersResult.users) {
        const customClaims = (await admin.auth().getUser(userRecord.uid)).customClaims || {};
        const userWithRole = {
          uid: userRecord.uid,
          email: userRecord.email || '',
          displayName: userRecord.displayName || '',
          roles: customClaims,
        };
        usersWithRoles.push(userWithRole);
      }
  
      return usersWithRoles;
    } catch (error) {
      console.error('Error getting users with roles:', error);
      throw error;
    }
  }
  
//   getAllUsersWithRoles().then(users => {
//     console.log('Users with roles:', users);
//   });

