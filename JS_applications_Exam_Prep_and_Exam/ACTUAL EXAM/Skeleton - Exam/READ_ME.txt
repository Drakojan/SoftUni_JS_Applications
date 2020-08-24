1) Use npm install to instal required node modules.

2) The app uses firebase CLOUD FIRESTORE as BaaS - NOT the Realtime Database. 
It relies on firebase.auth() and firebase.firestore() to work properly. 

3) If you want to use your own DB you have to change the info in config/firebaseConfig.js.
Also make sure to have Email/Password enabled as auth method and allow authenticated users to modify the DB.

4) Use live server to test. Note that the live server will want to start at http://127.0.0.1:5501 as per .vscode/settings.json

5) I'm using the login page as a start page and guest "home" page. I'm using the dashboard as logged-in user "home" page.
There's an actual #/home route left just in case someone manualy types it in.

6) All functionalites described in the task are tested and appear to be working on my machine including the bonus Sort. 

7) My softuni username is Drakojan --- email - nikolay.mitrev1@gmail.com
