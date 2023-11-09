// conexao.js
const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'DB_JAFE',
});

// Conectar ao banco de dados
conexao.connect((err) => {
  if (err) {
    console.error('Erro de conexão:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!');
  }
});

module.exports = conexao;