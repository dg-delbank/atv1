const express = require('express');
const app = express();

app.use(express.json());

const { insert } = require('./controller');

app.get('/search', (req, res) => {
  res.send('Teste');
});

app.post('/insert', insert);

app.listen(3000, () => {
  console.log('Tá na porta 3000');
});
