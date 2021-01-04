const { validationResult } = require('express-validator');
var Sequelize = require('sequelize');

const Patients = require('../models/patientlist');
const { Op } = require("sequelize");

const db = require('../util/dbseq.js')
const { QueryTypes } = require('sequelize');

//Medication details
exports.getPatients = async (req, res, next) => {
    const patname = req.query.patname;
    const doctid = req.query.doctid;

    await db.sequelize.query("SELECT * from doctpat_hcs WHERE doctid = ? and patname like ?",
        {
            replacements: [ doctid, patname+'%' ],
            plain: false,
            type: QueryTypes.SELECT
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving details with Doctor=" + doctid + "& Patient=" + patname
            });
        });
};