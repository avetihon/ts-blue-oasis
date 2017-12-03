const path = require('path');
const router = require('express').Router();
const routes = require('../api/routes');

router.use('/api/v1', routes.public);

router.use('/private', routes.private);

router.use('*', (request, response) => {
    response.sendFile(path.resolve('public/index.html'));
});

module.exports = router;
