/**
 * Get dependencies
 */
const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

/**
 * Loads environment variables
 */
const settings = require('./config/settings').load();

const db = require('./config/databaseWrapper/DatabaseConnector');
const dbURL = require('./config/databaseWrapper/URL').build();
const middleware  = require('./config/middleware');
const DATABASE_EVENT_LIST = require('./config/constants/DatabaseEventList');

// connect to DB
db.connect(dbURL);

// Get our API routes
const app = express();

// logging request to console
app.use(morgan('tiny'));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing application/json
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public/')));

// app.use('/private/user', verifyAccessToken);
// app.use('/private/classification', verifyAccessToken);
// Add error handling
app.use(require('./config/routes'));
app.use(require('./config/middleware').errorHandler);
app.set('port', settings.http.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
db.on(DATABASE_EVENT_LIST.OPEN, () => {
    server.listen(settings.http.port, '0.0.0.0', () => console.log(`API running on localhost:${settings.http.port}`));
});


