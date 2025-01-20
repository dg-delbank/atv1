const { Client } = require('pg');
const { channel } = require('./app');

async function insert(req, res) {
  const body = req.body;

  if (typeof body === 'object' && body !== null) {
    const client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    await client.connect();
    
    await client.query('INSERT INTO tabelinha(coluninha) VALUES($1)', [body.coluninha]);

    if (channel) {
      await channel.sendToQueue('dataQueue', Buffer.from(JSON.stringify(body)));
    }

    res.json(body);
  } else {
    res.status(400).send("Então... mande certo! kkkkkKKKKKKKKKKKKKkkkkkkkkkkkkkkkkk");
  }
}

module.exports = { insert };