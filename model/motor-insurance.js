const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const MotorInsurance = sequelize.define('motorInsurance', {
    vehicle_type: {
        type: DataTypes.STRING,
    },
    case_type: {
        type: DataTypes.ENUM("rollover", "new", "used", "rollover_breakin")
    },
    policy_type: {
        type: DataTypes.ENUM("comprehensive", "third_party", "own_damage")
    },
    vehicle_no: {
        type: DataTypes.STRING,
    },
    vehicle_make: {
        type: DataTypes.STRING,
    },
    vehicle_model: {
        type: DataTypes.STRING,
    },
    fuel_type: {
        type: DataTypes.STRING,
    },
    vehicle_variant: {
        type: DataTypes.STRING,
    },
    vehicle_mfg_yr: {
        type: DataTypes.STRING,
    },
    gaskit_status :{
        type: DataTypes.STRING,
    },
    gaskit_outside : {
        type : DataTypes.STRING,
    },
    registration_date: {
        type: DataTypes.STRING,
    },
    rm_name_Code: {
        type: DataTypes.STRING,
    },
    gaskit_installed: {
        type: DataTypes.STRING,
    },
    rto : {
        type : DataTypes .STRING
    },
    previous_policy_add_on: {
        type: DataTypes.STRING,
    },
    previous_policy_insurance_company: {
        type: DataTypes.STRING,
    },
    previous_policy_idv: {
        type: DataTypes.STRING,
    },
    previous_policy_no: {
        type: DataTypes.STRING,
      },
    previous_policy_discount: {
        type: DataTypes.STRING,
    },
    previous_policy_end_date: {
        type: DataTypes.STRING,
      },
    // previous_policy_start_date: {
    //     type: DataTypes.STRING,
    //   },
    policy_status: {
        type: DataTypes.ENUM('continue', 'expired within 90 day', 'expired above 90 day'),
    },
    required_add_on: {
        type: DataTypes.TEXT,
    },
    required_insurance_company: {
        type: DataTypes.TEXT,
    },
    require_idv: {
        type: DataTypes.STRING,
    },
    require_discount: {
        type: DataTypes.STRING,
    },
    expected_final_premium: {
        type: DataTypes.STRING,
    },
    engine_no: {
        type: DataTypes.STRING,
    },
    chassis_no: {
        type: DataTypes.STRING,
    },
    policy_start: {
        type: DataTypes.STRING,
    },
    policy_expiry: {
        type: DataTypes.STRING,
    },
    policy_no: {
        type: DataTypes.STRING,
    },
    policy_issue: {
        type: DataTypes.STRING,
    },
    policy_receive: {
        type: DataTypes.STRING,
    },
    od_net_premium: {
        type: DataTypes.STRING,
    },
    terrorism_prem: {
        type: DataTypes.STRING,
    },
    owner_driver: {
        type: DataTypes.STRING,
    },
    gross_premium: {
        type: DataTypes.STRING,
    },
    tax_amount: {
        type: DataTypes.STRING,
    },
    idv: {
        type: DataTypes.STRING,
    },
    net_premium: {
        type: DataTypes.STRING,
    },
    payment_mode: {
        type: DataTypes.STRING,
    },
    tran_amt: {
        type: DataTypes.STRING,
    },
    passenger: {
        type: DataTypes.STRING,
    },
    pcv_gcv_misc: {
        type: DataTypes.STRING,
    },
    remarks: {
        type: DataTypes.STRING,
    },
    final_policy: {
        type: DataTypes.STRING
    },
    reason :{
        type : DataTypes.STRING
    },
    isBreakIn : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    od_net_premium : {
        type : DataTypes.STRING
    },
    tp_cover : {
        type : DataTypes.STRING
    },
    addons : {
        type : DataTypes.STRING
    },
    cc_gcv_str : {
        type : DataTypes.STRING
    },
    insurance_branch : {
        type : DataTypes.STRING
    },
    insurance_company : {
        type : DataTypes.STRING
    },
    commisanalbe_premium : {
        type : DataTypes.STRING
    },
    broker_name : {
        type : DataTypes.STRING
    },
    remark_internal_ops : {
        type : DataTypes.TEXT
    },
    file_type :{
        type : DataTypes.TEXT
    },
    file :{
        type : DataTypes.JSON
    },
    inspection_no: {
        type: DataTypes.STRING,
      },
})

module.exports = MotorInsurance