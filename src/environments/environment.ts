// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_signalr: 'https://localhost:44365/',
  base_url: 'https://localhost:44365/api/',
  base_urlImg: 'https://localhost:44365/img/',

  // Api Local
  // base_url: 'http://localhost:9090/api/',
  // base_urlImg: 'http://localhost:9090/img/',

  // base_url: 'http://luxurybuildingapp.com:9090/api/',
  // base_urlImg: 'http://luxurybuildingapp.com:9090/img/',
};

/*
 * Para una depuración más sencilla en el modo de desarrollo, puede importar el siguiente archivo
 * para ignorar los marcos de pila de errores relacionados con la zona, como `zone.run`,` zoneDelegate.invokeTask`.
 *
 * Esta importación debe comentarse en modo producción porque tendrá un impacto negativo
 * sobre el rendimiento si se produce un error.
 */
// importar 'zone.js / dist / zone-error'; // Incluido con Angular CLI.
