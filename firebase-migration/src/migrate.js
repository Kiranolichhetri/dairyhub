const fs = require('fs');
const admin = require('firebase-admin');
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: firebaseConfig.databaseURL
});

// Read the JSON database
fs.readFile('./data/database.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    const db = admin.database();
    const ref = db.ref('your_firebase_node'); // Change this to your desired Firebase node

    // Process and upload data to Firebase
    ref.set(jsonData, (error) => {
        if (error) {
            console.error('Error uploading data to Firebase:', error);
        } else {
            console.log('Data successfully migrated to Firebase!');
        }
    });
});