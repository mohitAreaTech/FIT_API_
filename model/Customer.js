const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Customer = sequelize.define("customer", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.STRING,
    },
    address_line1: {
        type: DataTypes.STRING,
    },
    address_line2: {
        type: DataTypes.STRING,
    },
    address_line3: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    pincode: {
        type: DataTypes.STRING,
    },
    pan_card: {
        type: DataTypes.STRING
    },
    aadhar_card: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    marital_status: {
        type: DataTypes.STRING
    },
    occupation: {
        type: DataTypes.STRING,
    },
    nominee_name: {
        type: DataTypes.STRING
    },
    nominee_relation: {
        type: DataTypes.STRING
    },
    nominee_age: {
        type: DataTypes.STRING
    },
    appointee_name: {
        type: DataTypes.STRING
    },
    appointee_relation: {
        type: DataTypes.STRING
    },
    verification_code : {
        type : DataTypes.STRING
    },
    access_token : {
        type : DataTypes.STRING
    }

})

module.exports = Customer;