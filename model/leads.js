const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const lead = sequelize.define("lead", {
    remark: {
        type: DataTypes.TEXT,
    },
    isAccepted : {
        type : DataTypes.BOOLEAN,
        defaultValue : null
    },
    quotation_generated : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    payment_url  :{
        type : DataTypes.TEXT
    },
    payment_complete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    status : {
        type : DataTypes.ENUM('pending','accepted','under-ops','policy-generated','document-pending','payment-pending',"booking-pending","booking-rejected","payment-recieved",'rejected'),
        defaultValue : "pending"
    },
    type : {
        type : DataTypes.ENUM("online", "offline"),
        defaultValue : "online"
    }
})

module.exports = lead;