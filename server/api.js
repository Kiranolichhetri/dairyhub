const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Add at the top of your api.js
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // or use serviceAccountKey.json
});

// In your /api/users route:
app.post('/api/users', async (req, res) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // Only proceed if token is valid
    // ...rest of user creation code...
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dairyhub', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: String,
  provider: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// API endpoint to create user profile
app.post('/api/users', async (req, res) => {
  const { uid, name, email, provider } = req.body;
  if (!uid || !email) return res.status(400).json({ error: 'Missing uid or email' });

  // Upsert user profile
  const user = await User.findOneAndUpdate(
    { uid },
    { name, email, provider },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json({ success: true, user });
});

// Start server
app.listen(4000, () => {
  console.log('API server running on http://localhost:4000');
});