const Sequelize = require('sequelize')
const db = require('../util/dbseq.js')

module.exports = db.sequelize.define(
    "login_hc",
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        role_name:{
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)