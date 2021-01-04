const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = require('../models/loginseq');

var assert = require('assert');

process.env.SECRET_KEY ='secret';

exports.login = async (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;
    const role_name = req.body.role_name;
    Login.findOne({
        where:{
            username,
            role_name,
            password
        }
    })
    .then(user => {
        //if(bcrypt.compareSync(password,user.password)){
            var buf1 = Buffer.from(password);
            var buf2 = Buffer.from(user.password);
        if(buf1.equals(buf2)){
            console.log('inside');
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                expiresIn: 1440
            })
            res.json({token: token,userId: user.id})
        }else{
            res.json("A user with these details could not be found.")
        }
    })
    .catch(err => {
        /*res.redirect("/auth/login");
        res.status(500).send({
            message: "A user with these details could not be found.",err
        });*/
        res.json({status:"error",message:"A user with these details could not be found."})
    });
};
