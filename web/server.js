const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({extended: true}));

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

        app.get('/form', (req, res) => {
            res.send(`
                <form method="POST" action="/save">
                    <input name="name" placeholder = "Digite seu nome">
                    <button type = "submit">Cadastrar</button>
                </form>
            `);
        });
        
        app.post('/save', (req, res) => {
            const name = req.body.name;
            db.query('INSERT INTO users (name) VALUES (?)',
                [name], (err) => {
                    if(err) return res.send('Erro ao cadastrar');
                    res.send('Usuario cadastrado com sucesso');
                }
            );
        });

        app.listen(4000, ()=>{
            console.log('Servidor web rodando na porta 4000');
        });
    }
});
}
connectToDB();

