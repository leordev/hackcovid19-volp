// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyB4S-sUQAqQ6Ydb4urHILxiR4b4gSOqvaM',
  authDomain: 'volp-4d850.firebaseapp.com',
  databaseURL: 'https://volp-4d850.firebaseio.com',
  projectId: 'volp-4d850',
  storageBucket: 'volp-4d850.appspot.com',
  messagingSenderId: '727434747154',
  appId: '1:727434747154:web:af886dd7bc535de00ae7cb',
  measurementId: 'G-G5WN6NL6XP',
});

const messaging = firebase.messaging();
