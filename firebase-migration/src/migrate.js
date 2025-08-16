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

// Migrate a collection and preserve ids when present
async function migrateCollection(collectionName, items) {
  if (!Array.isArray(items) || items.length === 0) {
    console.log(`No items for ${collectionName}, skipping.`);
    return;
  }

  console.log(`Starting migration for ${collectionName} (${items.length} items)`);

  for (const item of items) {
    try {
      if (item.id) {
        const id = item.id.toString();
        const { id: _id, ...rest } = item;
        await db.collection(collectionName).doc(id).set(rest);
      } else {
        await db.collection(collectionName).add(item);
      }
    } catch (err) {
      console.error(`Failed to import item into ${collectionName}:`, err.message || err);
    }
  }

  console.log(`${collectionName} migrated successfully!`);
}

async function migrateAll() {
  await migrateCollection('products', products);
  await migrateCollection('users', users);
  await migrateCollection('orders', orders);
  await migrateCollection('reviews', reviews);
  console.log('All data migrated!');
}

migrateAll().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});