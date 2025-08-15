# Firebase Migration Project

This project is designed to migrate an existing JSON database to Firebase. It includes scripts to read data from a local JSON file and upload it to a Firebase database.

## Project Structure

```
firebase-migration
├── src
│   ├── migrate.js          # Main logic for migrating data to Firebase
│   └── firebaseConfig.js    # Firebase configuration settings
├── data
│   └── database.json        # Existing JSON database to be migrated
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. **Create a Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the prompts to create a new project.

2. **Add Firebase to Your Web App**
   - In the Firebase console, navigate to "Project settings" and find your Firebase configuration.
   - Copy the configuration object, which includes the API key, project ID, and other credentials.

3. **Install Dependencies**
   - Navigate to the project directory in your terminal.
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```

4. **Run the Migration Script**
   - Ensure that your `data/database.json` file is correctly structured.
   - Execute the migration script using the following command:
     ```
     node src/migrate.js
     ```

## Notes
- Make sure to set up the necessary permissions in your Firebase database to allow data uploads.
- Review the `src/firebaseConfig.js` file to ensure it contains the correct Firebase configuration.

## License
This project is licensed under the MIT License.