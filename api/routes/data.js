const router = require('express').Router();
const DataController = require('../controllers/DataController');
const verifyAccessToken = require('../../app/middleware').verifyAccessToken;

router.use(verifyAccessToken);
router.post('/', DataController.saveData);
router.get('/movement', DataController.getDataListByMovementType);

module.exports = router;
