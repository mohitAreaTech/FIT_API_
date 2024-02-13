const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const policyDocs = sequelize.define("policy_document", {
    document_type : {
        type : DataTypes.STRING,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = policyDocs;