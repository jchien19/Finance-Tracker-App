require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { login, register, test, getLedger, getExpenses } = require('./controllers/financeControllers')
const cors = require('cors');
const client = require('./pgClient')

const PORT = process.env.PORT || 3500;

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
  credentials: true
}));

// configure session
app.use(session({
  secret: process.env.SECRET_KEY,
  name: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // maxAge: 1000 * 60 * 60 * 24, // 1 day age limit
    secure: false,               // Set to true if using HTTPS
    // httpOnly: true               // Prevents client-side JavaScript from accessing the cookie
  } 
}));

// routing
app.get('/', async (req, res) => {
  // const id = uuidv4();
  // res.json(id)
  const date = new Date()
  const dateFormat = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear()
  res.json(dateFormat)
});

app.get('/session', async (req, res) => {
  req.session.userID = "test"
  res.cookie("user", 'testuser')
  res.status(200).json('test json')
});

app.get('/getLedger', getLedger);

app.get('/getExpenses', getExpenses);

app.post('/login', login);

app.post('/register', register)

app.get('/getTest', test)

app.get('/sessionUser', (req, res) => {
  // if (req.session.userId) {
  //   res.json({ userId: req.session.userId });
  // } else {
  //   res.status(401).json({ error: 'Not logged in' });
  // }
  console.log(req.session)
  res.status(200).json('success')
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