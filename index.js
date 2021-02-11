const express = require("express");
const app = express();

app.set('view engine', 'ejs');//render de html - setado

app.get("/:nome/:lang",(req,res) => { //:parametros obrigatorios
    var nome = req.params.nome; 
    var lang = req.params.lang;
        res.render("index",{
        nome: nome,
        lang:lang,
        empresa: "Guia do porgramador",
        inscritos: 1000
    }); 
});
app.listen(8080,()=>{
    console.log("App rodando!");
});