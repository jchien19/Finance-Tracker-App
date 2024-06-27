require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TestDB',
    password: '7780mnw&p', // password for user
    port: 5432, 
});

const PORT = process.env.PORT || 3500;

// create express app
const app = express();

// middleware
app.use(express.json());

// configure session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // using HTTP, so this is set to false for now
}));

// routing
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM accounts')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

client.connect()
.then(() => {
    console.log('Connected to PostgreSQL server')
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`)
    })
})
.catch((err) => {
    console.error('Connection error', err)
});