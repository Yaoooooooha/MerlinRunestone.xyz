const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const createTable = async () => {
  const query = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        twitter_id VARCHAR(16) UNIQUE NOT NULL,
        evm_address VARCHAR(42) UNIQUE NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();
