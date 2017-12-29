const routerPublic = require('express').Router();
const routerPrivate = require('express').Router();

/**
 * Public routers
 */
routerPublic.use('/', require('./server'));
routerPublic.use('/recognition', require('./recognition'));

/**
 * Private routers
 */
routerPrivate.use('/authorize', require('./auth'));
routerPrivate.use('/user', require('./user'));
routerPrivate.use('/data', require('./data'));
routerPrivate.use('/ml', require('./ml'));


module.exports.public = routerPublic;
module.exports.private = routerPrivate;
