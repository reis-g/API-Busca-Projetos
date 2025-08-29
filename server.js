
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetos_condor'
});

// Buscar todos os projetos
app.get('/projetos', (req, res) => {
  db.query('SELECT * FROM projeto', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Buscar projeto por código
app.get('/projetos/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  db.query('SELECT * FROM projeto WHERE CodigoProjeto = ?', [codigo], (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
