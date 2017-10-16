const path = require('path');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const serverController = require('../controllers/server');
const neuralController = require('../controllers/neural');

module.exports = (app) => {

    /* Public api */
    app.get('/api/v1/hello-server', serverController.helloServer);
    // app.post('/api/v1/classification/recognize', );

    /* Private api */
    app.get('/private/user', userController.getUser);
    app.post('/private/auth/sign-in', authController.signIn);
    app.post('/private/neural/data', neuralController.saveData);
    app.post('/private/neural/train', neuralController.trainNetwork);

    // Catch all routes and return the index file
    app.get('*', (request, response) => {
        response.sendFile(path.resolve('public/index.html'));
    });
};
