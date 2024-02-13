require('dotenv').config();
const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false
});

console.log('Database connected Successfully!!!');

module.exports = connection;