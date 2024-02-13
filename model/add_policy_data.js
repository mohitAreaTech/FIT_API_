const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const AddPolicyData = sequelize.define('addPolicyData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    customerFullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerEmailAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerPincode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerCity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerState: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleMake: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleModel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleVariant: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    caseType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policyType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleCategory: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currentIssuedPolicyDocument: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    previousYearPolicydocument: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rc_front_document: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rc_back_document: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    form_29_document: {
        type: DataTypes.STRING,
        allowNull: true
    },
    other: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fuel_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sitting_capacity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicle_idv: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicle_ncb: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    engine_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    chassis_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cubic_capacity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policyStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    manufacturing_Date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    registration_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policy_issued_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policy_start_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policy_end_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    policy_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CPA: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    od_net_premium: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tp_premium: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    net_premium: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gst_Tax_amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    final_premium: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pos_data: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    MIS_employeeData: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    policy_type: {
        type: DataTypes.ENUM('offline', 'online'),
        allowNull: true,
    },
    policyUniqueId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    editedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    insurerName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currentInsuerName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});

sequelize.sync();

module.exports = AddPolicyData;