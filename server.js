// Get dependencies
const express    = require('express');
const path       = require('path');
const http       = require('http');
const morgan     = require('morgan');
const dotenv     = require('dotenv');
const bodyParser = require('body-parser');


const db                = require('./databaseWrapper/database');
const routes            = require('./routes/routes.js');
const jsonWebTokenCheck = require('./middlewares/jsonWebTokenCheck');
const errorHandler      = require('./middlewares/errorHandler');

// Get our API routes

const app = express();

// loads environment variables
dotenv.config();

// logging request to console
app.use(morgan('tiny'));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing application/json
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/private/user', jsonWebTokenCheck);
app.use('/private/classification', jsonWebTokenCheck);

app.use(errorHandler);

db.connect(process.env.MONGODB_URI);

// send app to router
routes(app);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
db.on('open', () => {
    server.listen(port, '0.0.0.0', () => console.log(`API running on localhost: ${port}`));
});


