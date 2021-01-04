const Sequelize = require('sequelize')
const db = require('../util/dbseq.js')

module.exports = db.sequelize.define(
    "details_hc",
    {
        detid:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        username:{
            type: Sequelize.STRING
        },
        role_name:{
            type: Sequelize.STRING
        },
        age:{
            type: Sequelize.STRING
        },
        gender:{
            type: Sequelize.STRING
        },
        phno:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)