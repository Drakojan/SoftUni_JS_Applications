1) Use npm install to instal required node modules.

2) The app uses firebase Cloud Firestore as BaaS. 
It relies on firebase.auth() and firebase.firestore() to work properly. 

3) If you want to use your own DB you have to change the info in config/firebaseConfig.js.
Also make sure to have Email/Password enabled as auth method and allow authenticated users to modify the DB.

4) Use live server to test.
