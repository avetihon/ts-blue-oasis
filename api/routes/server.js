const router = require('express').Router();
const ServerController = require('../controllers/ServerController');

router.get('/hello-server', ServerController.helloServer);

module.exports = router;
