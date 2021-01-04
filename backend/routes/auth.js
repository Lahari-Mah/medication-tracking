const express = require('express');

const { body } = require('express-validator');

const authController = require('../controllers/authseq');
//const detailController = require('../controllers/details');

const router = express.Router();

router.post(
    '/login',authController.login
);

module.exports = router;