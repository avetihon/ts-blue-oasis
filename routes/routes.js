const path = require('path');
const authController = require('../controllers/auth');
const serverController = require('../controllers/server');
const classificationController = require('../controllers/classification');

module.exports = (app) => {

    /* Public api */
    app.get('/api/v1/helloServer', serverController.helloServer);

    /* Private api */
    app.post('/private/auth/signIn', authController.signIn);
    app.post('/private/train', classificationController.trainModel);

    // Catch all routes and return the index file
    app.get('*', (request, response) => {
        response.sendFile(path.resolve('public/index.html'));
    });
};
