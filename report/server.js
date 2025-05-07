const express = require("express");
const mysql = require("mysql2");

const app = express();

function connectToDB(){
const db = mysql.createConnection({
    host : 'db',
    user : 'projeto',
    password : 'projeto',
    database : 'app_db'
});

db.connect((err)=>{
    if(err){
        console.log("Aguardando o mysql iniciar...");
        setTimeout(connectToDB, 3000);
    } else {
        console.log("Conectado ao mysql");
        app.get('/list-users', (req, res) => {
            db.query('SELECT * FROM users', (err, results) => {
                if(err) return res.send('Erro ao buscar usuarios');
                res.json(results);
            });
        });
        
        app.listen(4040, ()=> {
            console.log('Servidor de relatorios rodando na porta 4040');
        });
    }
});

}

connectToDB();