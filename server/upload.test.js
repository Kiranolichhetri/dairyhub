const request = require('supertest');
const express = require('express');
const path = require('path');

// Import your app (assuming you export it in upload.js)
let app;
try {
  app = require('./upload');
} catch (e) {
  // fallback: create a minimal app for test if not exported
  app = express();
}

describe('DairyHub Upload API', () => {
  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/upload');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/no file/i);
  });
  // Add more tests for successful upload, fallback, etc.
});
