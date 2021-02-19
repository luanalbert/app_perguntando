const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaMOdel = require("./database/Pergunta");

//DATA BASE 
connection //Promise
    .authenticate()
    .then( () =>{
        console.log("conexão ok")
    })
    .catch((erro)=>{
        console.log(erro);
    })


app.set('view engine', 'ejs');//render de html - setado
app.use(express.static('public'));//arquivos staticos

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));//traduzir os dados para que o js leia
app.use(bodyParser.json());

app.get("/",(req,res) => { //:parametros obrigatorios
    res.render("index");
});
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});
app.post("/salvarpergunta",(req,res) => {//recebendo dados do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send('formulario recebido' +titulo +" , "+ descricao);
});





app.listen(8080,()=>{
    console.log("App rodando!");
});