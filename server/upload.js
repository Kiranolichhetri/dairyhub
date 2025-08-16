const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('serviceAccountKey.json not found in server/ - place your service account JSON there');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH)),
  storageBucket: process.env.FS_BUCKET || (require('./serviceAccountKey.json').project_id + '.appspot.com')
});

const bucket = admin.storage().bucket();

const app = express();
const UPLOAD_DIR = path.join(__dirname, 'uploads');
async function ensureUploadsDir() {
  await fsp.mkdir(UPLOAD_DIR, { recursive: true });
}

app.use('/static', express.static(UPLOAD_DIR));

const port = process.env.PORT || 3001;
const upload = multer({ storage: multer.memoryStorage() });

// Helpers
async function saveToLocal(buffer, filename) {
  const localPath = path.join(UPLOAD_DIR, filename);
  await fsp.writeFile(localPath, buffer);
  return `http://localhost:${port}/static/${encodeURIComponent(filename)}`;
}

async function tryUploadToGCS(buffer, filename, contentType) {
  const file = bucket.file(filename);
  await file.save(buffer, { metadata: { contentType }, public: true });
  const [url] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });
  return url;
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    await ensureUploadsDir();
    const timestamp = Date.now();
    const gcsName = `product-images/${timestamp}_${req.file.originalname}`;
    const localName = `${timestamp}_${req.file.originalname}`;

    try {
      const url = await tryUploadToGCS(req.file.buffer, gcsName, req.file.mimetype);
      return res.json({ success: true, url, path: gcsName, storage: 'gcs' });
    } catch (gcsErr) {
      console.warn('GCS upload failed, falling back to local storage:', gcsErr.message);
      const url = await saveToLocal(req.file.buffer, localName);
      return res.json({ success: true, url, path: `local/${localName}`, storage: 'local' });
    }
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Upload file and create Firestore product document in one request
app.post('/create-product', upload.single('file'), async (req, res) => {
  try {
    const { name, category, price, stock, brand, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const timestamp = Date.now();
    const filename = `product-images/${timestamp}_${req.file.originalname}`;
    const file = bucket.file(filename);

    let url;
    await ensureUploadsDir();
    const gcsName = `product-images/${timestamp}_${req.file.originalname}`;
    const localName = `${timestamp}_${req.file.originalname}`;
    try {
      url = await tryUploadToGCS(req.file.buffer, gcsName, req.file.mimetype);
    } catch (gcsErr) {
      console.warn('GCS upload failed in create-product, falling back to local storage:', gcsErr.message);
      url = await saveToLocal(req.file.buffer, localName);
    }

    // Create product document in Firestore
    const product = {
      name: name || 'Untitled',
      category: category || '',
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      brand: brand || '',
      description: description || '',
      rating: 0,
      image: url,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await admin.firestore().collection('products').add(product);

    res.json({ success: true, id: docRef.id, product: { id: docRef.id, ...product } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('DairyHub upload endpoint'));

// Health
app.get('/healthz', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Purge local uploads older than `days` (query param), default 30
app.delete('/purge-old-uploads', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const cutoff = Date.now() - days * 24 * 3600 * 1000;
    await ensureUploadsDir();
    const files = await fsp.readdir(UPLOAD_DIR);
    const removed = [];
    for (const f of files) {
      const full = path.join(UPLOAD_DIR, f);
      const stat = await fsp.stat(full);
      if (stat.isFile() && stat.mtimeMs < cutoff) {
        await fsp.unlink(full);
        removed.push(f);
      }
    }
    res.json({ success: true, removedCount: removed.length, removed });
  } catch (err) {
    console.error('Purge failed:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Upload server listening on ${port}`));
