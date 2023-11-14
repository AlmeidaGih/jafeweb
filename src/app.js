const express = require('express');
const conexao = require('../db/conexao.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/header', (req, res) => {
  res.sendFile(__dirname + '/views/header.html');
});

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
  res.sendFile(__dirname + '/views/recipes.html');
});

app.get('/products', (req, res) => {
    conexao.query('SELECT * FROM PRODUCT', (err, resultados) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).send('Erro interno do servidor');
        } else {
          res.json(resultados);
        }
    });
});

app.post('/cad-user', (req, res) => {

  const { user, email, cellphone, birthday, password } = req.body;

  const verificarEmail = `SELECT ID_CUSTOMER FROM CUSTOMER WHERE EMAIL_CUSTOMER = ?`;
  conexao.query(verificarEmail, [email], (err, result) => {
    if (err) {
      console.error('Erro ao verificar email:', err);
      res.status(500).send('Erro ao verificar email.');
      return;
    }
    
    if(result.length > 0){
      res.status(400).send('Email já está sendo utilizado')
    }else{
      // Query para inserir um novo cliente na tabela 'clientes'
      const queryInserirCliente = `INSERT INTO CUSTOMER (ID_CUSTOMER, NAME_CUSTOMER, EMAIL_CUSTOMER, PHONE_CUSTOMER, BIRTH_DATE_CUSTOMER) VALUES (DEFAULT, ?, ?, ?, ?)`;
      conexao.query(queryInserirCliente, [user, email, cellphone, birthday], (err, result) => {
      if (err) {
        console.error('Erro ao inserir cliente:', err);
        res.status(500).send('Erro ao inserir cliente no banco.');
        return;
      }

      console.log('Cliente inserido com sucesso! ID:', result.insertId);

      // Agora, vamos inserir um pedido usando o ID do cliente inserido
      const idClienteInserido = result.insertId;
      const queryInserirLogin = `INSERT INTO LOGIN (ID_LOGIN, FK_ID_CUSTOMER, USER_LOGIN, PASSWORD_LOGIN) VALUES (DEFAULT, ?, ?, ?)`;
      conexao.query(queryInserirLogin, [idClienteInserido, email, password], (err, result) => {
        if (err) {
          console.error('Erro ao inserir login:', err);
          res.status(500).send('Erro ao inserir login no banco.');
          return;
        }

        console.log('Login inserido com sucesso!');
        res.status(200).send('Cliente e login inseridos com sucesso!');
      });
    });
  }
  });
  
});

app.post('/login', (req, res) => {

  const {user, password } = req.body;

  const verificarEmail = `SELECT ID_LOGIN FROM LOGIN WHERE USER_LOGIN = ? AND PASSWORD_LOGIN = ?`;
  conexao.query(verificarEmail, [user, password], (err, result) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).send('Erro ao fazer login.');
      return;
    }

    if(result.length > 0){
      res.status(200).send('Login efetuado com sucesso!');
    }else{
      res.status(401).send('Não foi possível encontrar usuário!')
    }
  });
  
});



app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});