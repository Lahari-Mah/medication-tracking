const express = require('express');

const { body } = require('express-validator');

const detailController = require('../controllers/details');

const router = express.Router();

router.get(
    '/patient/',detailController.getDetails
);

router.get(
    '/doctor/',detailController.getDetails
);

module.exports = router;