const express = require("express");
const app = express();

app.set('view engine', 'ejs');//render de html - setado

app.get("/:nome/:lang",(req,res) => { //:parametros obrigatorios
    var nome = req.params.nome; 
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos= [
        {nome:"Doritos",preco: 3.50},
        {nome:"Coca Cola",preco: 5.80},
        {nome:"Red Bull",preco: 6.50},
        {nome:"Cucuz",preco: 2.50},
        {nome:"Suco",preco: 7.50}
    ]
        res.render("index",{
        nome: nome,
        lang:lang,
        empresa: "Guia do porgramador",
        inscritos: 1000,
        msg:exibirMsg,
        produtos: produtos
    }); 
});
app.listen(8080,()=>{
    console.log("App rodando!");
});