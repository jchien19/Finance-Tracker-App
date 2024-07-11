const client = require('../pgClient');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 3;
const jwt = require('jsonwebtoken');
const session = require('express-session')

const createJWT = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '1d'})
}

// GET

const getLedger = async (req, res) => {
  try {
    // const { start, end } = req.body
    // console.log('get ledger req start/end: ', req.query);
    const result = await client.query(`
      SELECT 
        ledger.id, 
        ledger.amount, 
        SUBSTRING( cast (ledger.trans_date as TEXT) FROM 0 FOR 11) as trans_date, 
        ledger.expense, 
        category.category, 
        ledger.desc
      FROM ledger
      JOIN category
      ON ledger.category_id = category.id 
      AND ledger.trans_date >= '${req.query.start}' AND ledger.trans_date <'${req.query.end}'
      ORDER BY trans_date DESC;
`)
    // AND ledger.account_id = 'd1c1e475-52bb-4699-9f59-30cfcf8e953e' // should go before ORDER BY
    // console.log(result.rows)
    res.status(200).json(result.rows)
  } catch (error) {
    console.log('error getting ledger info: ', error)
    res.status(400).json(error)
  }
}

const getExpenses = async (req, res) => {
  try {
    const result = await client.query(`
      SELECT category_id, SUM(amount) AS total_amount_spent
      FROM ledger
      GROUP BY category_id
      ORDER BY category_id ASC;
    `).catch((error) => {
      console.error('Error retrieving expense data: ', error)
      res.status(500).json('Internal Server Error')
      return
    });
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log('Error getting expense info: ', error)
    res.status(400).json(error)
  }
  // full sql statement
  // SELECT category_id, SUM(amount) AS total_amount_spent
  // FROM ledger
  // WHERE account_id = '${req.body.user}'
  // GROUP BY category_id
  // ORDER BY category_id ASC;
}

// POST request from login page to login
const login = async (req, res) => {
    const { user, pass } = req.body
    // console.log("user: ", + user);
    // console.log("pass: " + pass);
    console.log('login fired')
    try {
        const result = await client.query(`SELECT usern, pass, id 
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
            req.session.cookie.user = {userID: result.rows[0].id}
            console.log("session user: ", req.session.userID)
            const jwt = createJWT(result.rows[0].id)
            res.status(200).json({jwt, user});
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

    const result = await client.query(`SELECT usern 
                                       FROM accounts 
                                       WHERE accounts.usern = '${user}'`)
    .catch((error) => {
      console.error('Error inserting data:', error);
      res.status(500).json('Internal Server Error');
      return;
    })
    if(result.rows.length > 0){
      console.log('inside usertaken')
      res.status(400).json('Username already taken!');
      return;
    }

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
      req.session.userID = id
      const jwt = createJWT(id)
      res.status(201).json({jwt, user});
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json('Internal Server Error');
    }
};

// TEST

const test = async (req, res) => {
  try {
    const result = await client.query(`SELECT usern, id
                                        FROM accounts 
                                        WHERE accounts.usern = 'Alice1'`)
      .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json('Internal Server Error');
            return;
      })
      console.log(JSON.stringify(req.session.userID))
      res.status(200).json(result.rows)
  } catch (error){
    console.log("Server error: ", error)
    res.status(400).json(error)
  }
}

const newTransaction = async (req, res) => {
  try {
    const { account_id, amount, title, category, date } = req.body
    console.log('date: ', category);
    let expense = true;
    let multiplier = -1;
    if(category == 6){ expense = false; multiplier = -1*multiplier; }; 
    const result = await client.query(`INSERT INTO public.ledger (account_id, amount, trans_date, "desc", category_id, expense)
    VALUES ('${account_id}', ${multiplier*amount}, '${date}', '${title}', ${category},${expense})
    `)
    .catch((error) => {
      console.log('Error with query: ', error);
      res.status(400).json(error);
      return;
    })
    console.log('inputted transaction result: ', result);
    res.status(200).json(result)
  } catch (error) {
    console.log('Error posting new transaction: ', error);
    res.status(400).json(error);
  }
}

// DELETE

const deleteTransaction = async (req, res) => {
  try {
    // const { id } = req.body
    // console.log('delete id: ', id)
    // console.log('delete req headers: ', req.params.id)
    const result = await client.query(`DELETE FROM ledger
      WHERE id = ${req.params.id}
      `).catch((error) => {
        console.log('error deleting from ledger: ', error);
        res.status(400).json(error);
        return;
      });
      console.log('Successfully deleted transaction');
      res.status(200).json(result);
    // res.status(200).json('ok');
  } catch(error) {
    console.log('Error deleting transaction: ', error);
    res.status(400).json(error);
  }
}

// UPDATE

const updateTransaction = async (req, res) => {
  try {
    console.log('update transaction fired')
    const { amount, date, title, category } = req.body
    let expense = true
    let multiplier = -1
    console.log('update amount: ', amount)
    if(category === 6){ expense = false; multiplier = -1*multiplier; }
    const result = await client.query(`
      UPDATE public.ledger
	    SET amount=${multiplier * amount}, trans_date = '${date}', "desc" = '${title}', category_id = ${category}, expense = ${expense}
	    WHERE id = ${req.params.id};
      `)
    .catch((error) => {
      console.log('Database error updating transaction: ', error);
      res.status(400).json(error);
      return;
    });
    console.log('update successful: ', result);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error updating transaction: ', error);
    res.status(400).json(error);
  }
}


module.exports = {
    login,
    register,
    test,
    getLedger,
    getExpenses,
    newTransaction,
    deleteTransaction,
    updateTransaction
};