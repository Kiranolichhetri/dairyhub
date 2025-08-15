const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to your service account key
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load your JSON data
const dataPath = path.join(__dirname, '../data/database.json');
const rawData = fs.readFileSync(dataPath);
const { products = [], users = [], orders = [], reviews = [] } = JSON.parse(rawData);

// Migrate products to Firestore
async function migrateCollection(collectionName, items) {
  if (!items.length) return;
  const batch = db.batch();
  items.forEach(item => {
    const docRef = db.collection(collectionName).doc();
    batch.set(docRef, { ...item });
  });
  await batch.commit();
  console.log(`${collectionName} migrated successfully!`);
}

async function migrateAll() {
  await migrateCollection('products', products);
  await migrateCollection('users', users);
  await migrateCollection('orders', orders);
  await migrateCollection('reviews', reviews);
  console.log('All data migrated!');
}

migrateAll().catch(console.error);