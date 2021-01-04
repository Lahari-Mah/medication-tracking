const Sequelize = require('sequelize')
const db = require('../util/dbseq.js')

module.exports = db.sequelize.define(
    "doctpat_hc",
    {
        doctid:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        patid:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        docname:{
            type: Sequelize.STRING
        },
        patname:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)