const express = require('express');
const { insert } = require('./controller');
const { Client } = require('pg');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

let channel, connection;

async function connectRabbitMQ() {
  connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
  channel = await connection.createChannel();
  await channel.assertQueue('dataQueue');
}

async function connectPostgres() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  await client.connect();
  return client;
}

app.get('/search', (req, res) => {
  res.send('Teste');
});

app.post('/insert', insert);

app.listen(3000, async () => {
  await connectPostgres();
  await connectRabbitMQ();
  console.log('Tá na porta 3000');
});

module.exports = { channel };