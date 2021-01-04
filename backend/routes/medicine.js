const express = require('express');

const { body } = require('express-validator');

const medicineController = require('../controllers/medicine');

const router = express.Router();

router.get(
    '/medication/',medicineController.getMedicine
);

router.get(
    '/medication/flag/',medicineController.updateFlag
);

router.get(
    '/medication/data/',medicineController.sharedMedicine
);

module.exports = router;