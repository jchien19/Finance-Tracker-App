const client = require('../pgClient');

// need to import finance Schema

// GET all accounts


// GET single

// POST request from login page to login
const login = async (req, res) => {
    const { user, pass } = req.body
    // console.log("user: ", + user);
    // console.log("pass: " + pass);
    console.log('login fired')
    try {
        const result = await client.query(`SELECT usern, pass 
                                            FROM accounts 
                                            WHERE accounts.usern = '${user}'
                                            AND accounts.pass = '${pass}'`
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
};

// POST for registering new users
// const register = async (req, res) => {
//     try {
//         const result = await client.query(`SELECT usern, pass 
//                                             FROM accounts 
//                                             WHERE accounts.usern = '${user}'
//                                             AND accounts.pass = '${pass}'`
//                                           );
//         if(result.rows.length > 0){
//             res.status(200).json(result)
//         } else {
//             res.status(404).json('User not found')
//         }
//     } catch (error) {
//         console.error('Error executing query', error);
//         res.status(500).send('Server error');
//     }
// };


// DELETE

// UPDATE

module.exports = {
    login
};