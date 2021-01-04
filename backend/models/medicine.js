const Sequelize = require('sequelize')
const db = require('../util/dbseq.js')

module.exports = db.sequelize.define(
    "patmedi_hc",
    {
        patid:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        mediid:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        patname:{
            type: Sequelize.STRING
        },
        medicname:{
            type: Sequelize.STRING
        },
        startdate:{
            type: Sequelize.DATE
        },
        enddate:{
            type: Sequelize.DATE
        },
        amtime:{
            type: Sequelize.TIME
        },
        pmtime:{
            type: Sequelize.TIME
        },
        sharedflag:{
            type: Sequelize.STRING
        },
        presdoc:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)