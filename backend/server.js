require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { login } = require('./controllers/financeControllers')
const cors = require('cors');
const client = require('./pgClient')

const PORT = process.env.PORT || 3500;

// create express app
const app = express();

// middleware
app.use(express.json());
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
  console.log("here")
  try {
      const result = await client.query(`SELECT usern, pass 
                                          FROM accounts 
                                          WHERE accounts.usern = 'Alice1'
                                          AND accounts.pass = 'password1'`
                                        );
      if(result.rows.length > 0){
          res.status(200).json(result)
      } else {
          res.status(404).json('User not found')
      }
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server error');
  }
});

app.post('/login', login);

// app.get('/register', register)

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