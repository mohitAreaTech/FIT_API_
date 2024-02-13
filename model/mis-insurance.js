const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const MisInsurance = sequelize.define('misInsurance', {
    vehicle_type: {
        type: DataTypes.STRING,
    },
    case_type: {
        type: DataTypes.ENUM("rollover", "new", "used", "rollover_breakin")
    },
    policy_type: {
        type: DataTypes.ENUM("comprehensive", "third_party", "own_damage")
    },
    coverages: {
        type: DataTypes.STRING,
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
    registration_date: {
        type: DataTypes.STRING,
    },
    rm_name_Code: {
        type: DataTypes.STRING,
    },
    pos_name_Code: {
        type: DataTypes.STRING,
    },
    rto: {
        type: DataTypes.STRING
    },
    policy_status: {
        type: DataTypes.ENUM('continue', 'expired within 90 day', 'expired above 90 days'),
    },
    engine_no: {
        type: DataTypes.STRING,
    },
    chassis_no: {
        type: DataTypes.STRING,
    },
    policy_start: {
        type: DataTypes.DATEONLY,
    },
    policy_expiry: {
        type: DataTypes.DATEONLY,
    },
    policy_no: {
        type: DataTypes.STRING,
    },
    policy_issue: {
        type: DataTypes.DATEONLY,
    },
    od_premium: {
        type: DataTypes.STRING,
    },
    net_premium: {
        type: DataTypes.STRING,
    },
    TP_premium: {
        type: DataTypes.STRING,
    },
    tax_amount: {
        type: DataTypes.STRING,
    },
    idv: {
        type: DataTypes.STRING,
    },
    gross_premium: {
        type: DataTypes.STRING,
    },
    commisanalbe_premium: {
        type: DataTypes.STRING,
    },
    discount: {
        type: DataTypes.STRING
    },
    insurance_company: {
        type: DataTypes.STRING
    },
    payment_mode: {
        type: DataTypes.STRING,
    },
    od_net_premium: {
        type: DataTypes.STRING
    },
    tp_cover: {
        type: DataTypes.STRING
    },
    addons: {
        type: DataTypes.STRING
    },
    cc_gcv_str: {
        type: DataTypes.STRING
    },
    insurance_branch: {
        type: DataTypes.STRING
    },
    broker_name: {
        type: DataTypes.STRING
    },
    remark_internal_ops: {
        type: DataTypes.TEXT
    },
    remark_pos: {
        type: DataTypes.TEXT
    },
})

module.exports = MisInsurance