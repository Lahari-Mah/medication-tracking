const { validationResult } = require('express-validator');
var Sequelize = require('sequelize');

const Medicine = require('../models/medicine');
const { Op } = require("sequelize");

const db = require('../util/dbseq.js')
const { QueryTypes } = require('sequelize');

//Medication details
exports.getMedicine = async (req, res, next) => {
    const startdate = req.query.startdate;
    const enddate = req.query.enddate;
    const patid = req.query.patid;
    
    Medicine.findAll({
        where: {
            /*startdate: {
                [Op.lte]: startdate
            },
            startdate: {
                [Op.gte]: enddate
            }*/
            startdate: {
                [Op.between]: [startdate, enddate]
            },
            patid
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving details with startDate=" + startdate + "& endDate=" + enddate
            });
        });
};

//SharedFlag updated 
exports.updateFlag = async (req, res, next) => {
    const patid = req.query.patid;
    var mediid = JSON.parse(req.query.mediid);

    const [results, metadata] = await db.sequelize.query("UPDATE patmedi_hcs SET sharedflag= 'yes' WHERE patid= (:patid)"
        + "and mediid in (:mediid)",
        {
            replacements: { patid: patid, mediid: mediid },
            type: QueryTypes.INSERT
        });
    res.send({
        message: "Flag updated successfully."
    });
};

//Patient List data 
exports.sharedMedicine = async (req, res, next) => {
    const patid = req.query.patid;
    const sharedflag = 'yes';

    Medicine.findAll({
        where: {
            patid,
            sharedflag
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving details with patiend id="+patid +"& shared flag=" +sharedflag
            });
        });
};