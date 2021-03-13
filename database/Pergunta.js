//model 
const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulo:{
        type:Sequelize.STRING,
        allowNull: false //impedi que esse campo type fique nulo
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then (()=>{}); //sincronização no banco de dados o ue for feito aqui vai ser criado no banco de dados, só cria coisas novas se a tabela já existir ele não força a re-criação

module.exports = Pergunta; //exportação do model