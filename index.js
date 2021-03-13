const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");//importação do model
const Resposta = require("./database/Resposta")

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
    Pergunta.findAll({ row: true, order:[
        ['id','DESC'] //vai mostrar do + novo p/ o mais velho ASC vai fazer o contrario
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });//metodo find all equivale a SELECT * ALL FROM perguntas
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => {//recebendo dados do formulario
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    
    Pergunta.create({ //salvando as perguntas no banco de dados
        titulo:titulo,
        descricao:descricao
    }).then(() =>{
        res.redirect("/"); //caso a pergunta sejá salva redireciona pra essa pagina
    }); //peguei o model e inseir o metodo create o que vai equivaler ao seguinte codigo SQL - INSERT INTO perguntas
});

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id;
    Pergunta.findOne({//busca um dado apenas
        where:{id:id} //onde id seja igual id
    }).then(pergunta =>{
        if(pergunta != undefined){//pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{//pergunta não encontrada
           res.redirect("/");
        }
    });
});

app.post('/responder', (req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });
});




app.listen(8080,()=>{
    console.log("App rodando!");
});