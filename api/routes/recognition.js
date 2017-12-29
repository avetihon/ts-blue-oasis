const router = require('express').Router();
const RecognitionController = require('../controllers/RecognitionController');

router.get('/', RecognitionController.recognition);

module.exports = router;
