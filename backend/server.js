require('dotenv').config()
const express = require('express');

const PORT = process.env.PORT || 3500;

// create express app
const app = express();

// middleware
app.use(express.json())

// routing
app.get('/', (req, res) => {
    res.send('Hello World')
})

// start app listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

