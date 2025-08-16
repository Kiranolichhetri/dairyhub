Server-side upload endpoint using Firebase Admin SDK

Usage
1. Place your service account JSON at `server/serviceAccountKey.json` (do NOT commit this file to source control).
2. Install dependencies:

   cd server
   npm install

3. Start the server (it will listen on port 3001 by default):

   npm start

4. The endpoint accepts multipart/form-data on POST /upload with field name `file` and returns JSON: { url, path }

Notes
- This server bypasses browser CORS because it runs server-side and uses Admin SDK.
- In production, protect this endpoint with authentication and rate-limiting.

Create product in one request
--------------------------------
You can upload an image and create a Firestore product document in a single request using POST /create-product.

Example using curl:

curl -F "file=@/path/to/image.jpg" \
   -F "name=Milk" \
   -F "category=milk" \
   -F "price=3.99" \
   -F "stock=100" \
   -F "brand=LocalFarm" \
   -F "description=Fresh milk" \
   http://localhost:3001/create-product

The response will include the created Firestore document id and the product object.
