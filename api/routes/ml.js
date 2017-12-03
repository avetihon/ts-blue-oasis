const router = require('express').Router();
const MLController = require('../controllers/MLController');
const verifyAccessToken = require('../../app/middleware').verifyAccessToken;

router.use(verifyAccessToken);
router.get('/train', MLController.trainClassifier);

module.exports = router;
