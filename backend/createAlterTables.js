const createTables = async (client) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
      );
    `;
  
    try {
      await client.query(createTableQuery);
      console.log('Table created successfully');
    } catch (err) {
      console.error('Error creating table', err.stack);
    }
  };

  module.exports = {
    createTables
}