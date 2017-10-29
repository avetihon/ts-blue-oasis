const router = require('express').Router();
const MLController = require('../controllers/MLController');
const verifyAccessToken = require('../../config/middleware').verifyAccessToken;

router.use(verifyAccessToken);
router.post('/data', MLController.saveData);
router.post('/train', MLController.trainClassifier);

module.exports = router;
