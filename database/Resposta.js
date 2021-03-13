const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}); //sincronização no banco de dados o ue for feito aqui vai ser criado no banco de dados, só cria coisas novas se a tabela já existir ele não força a re-criação
module.exports = Resposta;