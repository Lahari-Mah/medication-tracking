const express = require('express');

const { body } = require('express-validator');

const patListController = require('../controllers/patientlist');

const router = express.Router();

router.get(
    '/doctor/',patListController.getPatients
);

module.exports = router;