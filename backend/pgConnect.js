// const { Client } = require('pg');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres', 
    host: 'localhost',
    database: 'TestDB', 
    password: '7780mnw&p', // password for user
    port: 5432, 
});

const connectPG = async () => {
    client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL server')
    })
    .catch((err) => {
        console.error('Connection error', err)
  });
}

module.exports = connectPG