const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Details = require('../models/details');


//Patient details
exports.getDetails = async (req, res, next) => {
    const username = req.query.username;
    const detid = req.query.detid;
    
    Details.findOne({
        where:{
            detid,
            username
        }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving details with id=" + detid+"& username="+username
      });
    });
};