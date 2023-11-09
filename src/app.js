const express = require('express');
const conexao = require('../db/conexao.js');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/views/contactus.html');
});

app.get('/loja', (req, res) => {
    res.sendFile(__dirname + '/views/mall.html');
});

app.get('/receitas', (req, res) => {
    conexao.query('SELECT * FROM PRODUCT', (err, resultados) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).send('Erro interno do servidor');
        } else {
          res.json(resultados);
        }
    });
});



app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});