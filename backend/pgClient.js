const { Client } = require('pg');

const client = new Client({
    user: 'postgres', 
    host: 'localhost',
    database: 'TestDB', 
    password: '7780mnw&p', // password for user
    port: 5432, 
});

module.exports = client