const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Quotation = sequelize.define("quotation", {
    quotation : {
        type : DataTypes.STRING
    },
    attachment : {
        type : DataTypes.STRING,
        allowNull : false
    },
    isRejected : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    
})

module.exports = Quotation;