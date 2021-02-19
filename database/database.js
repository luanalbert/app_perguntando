const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas','root','85637156',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;