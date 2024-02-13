const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const MMVMaster = sequelize.define(
  "mmv_master",
  {
    Vehicle_Code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Variant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Body_Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Seating_Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Power: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cubic_Capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Grosss_Vehicle_Weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fuel_Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    No_Of_Wheels: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Abs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Air_Bags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Length: {
      type: DataTypes.DECIMAL(9, 3),
      allowNull: false,
    },
    Ex_Showroom_Price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price_Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Production: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Manufacturing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vehicle_Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // banks
    HDFC: {
      type: DataTypes.STRING,
    },
    Shriram: {
      type: DataTypes.STRING,
    },
    Kotak: {
      type: DataTypes.STRING,
    },
    Reliance: {
      type: DataTypes.STRING,
    },
    Future: {
      type: DataTypes.STRING,
    },
    Royal: {
      type: DataTypes.STRING,
    },
    Bajaj: {
      type: DataTypes.STRING,
    },
    Zuno: {
      type: DataTypes.STRING,
    },
    Liberty: {
      type: DataTypes.STRING,
    },
    Acko: {
      type: DataTypes.STRING,
    },
    Chola: {
      type: DataTypes.STRING,
    },
    ICICI: {
      type: DataTypes.STRING,
    },
    IFFCO: {
      type: DataTypes.STRING,
    },
    Magma: {
      type: DataTypes.STRING,
    },
    National: {
      type: DataTypes.STRING,
    },
    Raheja: {
      type: DataTypes.STRING,
    },
    SBI: {
      type: DataTypes.STRING,
    },
    Tata: {
      type: DataTypes.STRING,
    },
    NewIndia: {
      type: DataTypes.STRING,
    },
    Oriental: {
      type: DataTypes.STRING,
    },
    United: {
      type: DataTypes.STRING,
    },
    Universal: {
      type: DataTypes.STRING,
    },
    Navi: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = MMVMaster;
