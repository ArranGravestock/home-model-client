# Client Home-Model
A web app client with integration with home-model-api, using `what-wg` to retrieve data from a mysql database. The client is used to perceive any data or to control parts from the server `home-model-server`, respentation through graphs and statistics to provide knowledge about their smart hub. It is a basic implementation, for which shows how data can be used on a web client supplied by the API. It is possible to use the `home-model-api` to create your own web application for the `home-model-server`.

## Installation for development
Install dependencies:
```
npm install
```
Start a host on default port 3000:
```
npm start
````
## Built with
- [React.js](https://reactjs.org/) - Framework used

## Dependencies
```
"chart.js": "^1.1.1",
"material-ui": "^1.0.0-beta.38",
"material-ui-icons": "^1.0.0-beta.36",
"react": "^16.2.0",
"react-chartjs": "^1.2.0",
"react-color": "^2.13.8",
"react-dom": "^16.2.0",
"react-fontawesome": "^1.6.1",
"react-router": "^4.2.0",
"react-router-dom": "^4.2.2",
"react-scripts": "1.0.17",
"react-table": "^6.8.0",
"whatwg-fetch": "^2.0.3"
```

## Todo
```
-Update documentation using JSDOC
-Use web sockets over polling
-Improve error handling
-Add register device administrators to remove and add guests easier
-Registering of a new component
-Expansion of the tutorial page, favouring the use of driver.js
-Further customisability of the homepage so that elements can be hidden or added
-Dark and light mode in settings
-Resetting account details
-Updating password and email through settings
-Push notifcations to mobile devices
-Two-factor authentication
-Update layout to use a combination of flex and grid
-Add react-redux
```

## Authors
- Arran Gravestock

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
