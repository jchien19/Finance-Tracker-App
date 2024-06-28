require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { login, register } = require('./controllers/financeControllers')
const cors = require('cors');
const client = require('./pgClient')

const PORT = process.env.PORT || 3500;

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

// configure session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // using HTTP, so this is set to false for now
}));

// routing
app.get('/', async (req, res) => {
  // const id = uuidv4();
  // res.json(id)
  const date = new Date()
  const dateFormat = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear()
  res.json(dateFormat)
});

app.post('/login', login);

app.post('/register', register)

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