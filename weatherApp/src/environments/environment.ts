// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
/*
 * I am considering this as base URL because in this project this much url is common
 * API Docs- https://openweathermap.org/current
 */
  Base_URL: 'http://api.openweathermap.org/data/2.5/',
  // Used same API key which is provided in the test PDF (FE_Code_Test.pdf)
  API_KEY: '3d8b309701a13f65b660fa2c64cdc517',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
