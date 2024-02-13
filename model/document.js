const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Document = sequelize.define("document",{
   documentNumber : {
       type : DataTypes.STRING,
   },
   DocumentType :{
    type : DataTypes.STRING,
    allowNull : false
   },
   image :{
    type : DataTypes.STRING,
    allowNull : false
   },
   image_back :{
    type : DataTypes.STRING, 
   }
})

module.exports = Document;