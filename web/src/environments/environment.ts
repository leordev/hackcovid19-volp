// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://127.0.0.1:3333',
  firebase: {
    apiKey: 'AIzaSyB4S-sUQAqQ6Ydb4urHILxiR4b4gSOqvaM',
    authDomain: 'volp-4d850.firebaseapp.com',
    databaseURL: 'https://volp-4d850.firebaseio.com',
    projectId: 'volp-4d850',
    storageBucket: 'volp-4d850.appspot.com',
    messagingSenderId: '727434747154',
    appId: '1:727434747154:web:af886dd7bc535de00ae7cb',
    measurementId: 'G-G5WN6NL6XP',
  },
  STORAGE_KEYS: {
    locationStorageKey: 'volp@locationInfo',
    local_ONGs: 'volp@user',
    localADM: 'volp@admin',
    localUserHelper: 'volp@helper',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
