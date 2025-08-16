Steps to apply CORS and temporary storage rules for development

1) Open Google Cloud Shell from Firebase Console (or use a machine with gcloud and gsutil authenticated).

2) Upload or create the provided `cors.json` in Cloud Shell. If you cloned this repo in Cloud Shell, the file is already present.

3) Apply CORS to your bucket (replace the bucket name if different):

   gsutil cors set cors.json gs://dairyhub-2d605.appspot.com

4) (Optional) To make temporary dev storage rules, go to Firebase Console -> Storage -> Rules and paste the contents of `storage-dev-rules.txt`.

5) Hard-refresh your app and retry the upload. Monitor DevTools Network -> OPTIONS request. You should now see 200 and Access-Control-Allow-Origin header.

Security notes:
- The `storage-dev-rules.txt` file is intentionally permissive and must NOT be used in production.
- After verifying uploads work, revert to secure rules that require authentication and proper checks.

If you want, I can prepare a server-side upload endpoint using the Admin SDK next.
