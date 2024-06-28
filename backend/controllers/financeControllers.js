const client = require('../pgClient');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 3;

// GET

// POST request from login page to login
const login = async (req, res) => {
    const { user, pass } = req.body
    // console.log("user: ", + user);
    // console.log("pass: " + pass);
    console.log('login fired')
    try {
        const result = await client.query(`SELECT usern, pass 
                                            FROM accounts 
                                            WHERE accounts.usern = '${user}'`
                                          );
        //   AND accounts.pass = '${pass}'
        if(result.rows.length <= 0){
            res.status(404).json('User not found');  
            return;
        }                                  
        // console.log(result.rows[0].pass);
        const match = await bcrypt.compare(pass, result.rows[0].pass).catch((error) => {
            console.error('Error comparing password:', error);
            return;
        });

        if (match) {
            res.status(200).json(result);
            console.log('Password is correct!');
          } else {
            res.status(404).json('User not found');  
            console.log('Password is incorrect!');
          }

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Server error');
    }
};


// POST for registering new users
const register = async (req, res) => {
    console.log("register fired")
    const { user, pass } = req.body;

    const hashedPassword = await bcrypt.hash(pass, saltRounds).catch((error) => {
        console.log(error);
        console.log('error hashing password');
        return;
    })
    console.log("hashed pass: ", hashedPassword)

    const id = uuidv4();
    const date = new Date();
    const createdAt = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear()
    try {
      const query = 'INSERT INTO accounts (id, usern, pass, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [id, user, hashedPassword, createdAt];
  
      const result = await client.query(query, values);
      
      res.status(201).json({
        status: 'success',
        data: result.rows[0],
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
};

// DELETE

// UPDATE

module.exports = {
    login,
    register
};