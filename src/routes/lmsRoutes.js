const express = require('express');
const lmsController = require('../controllers/lmsController');

const router = express.Router();

router.post('/subscribe', lmsController.subscribe);
router.post('/loan/request', lmsController.requestLoan);
router.get('/loan/status/:customerNumber', lmsController.getLoanStatus);

module.exports = router;
