const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const createTable = async () => {
  const query = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      twitter_id VARCHAR(255) UNIQUE,
      evm_address VARCHAR(255) UNIQUE,
      ip_address VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_twitter_id ON users (twitter_id);
    CREATE INDEX idx_evm_address ON users (evm_address);
    CREATE INDEX idx_ip_address ON users (ip_address);
    CREATE INDEX idx_created_at ON users (created_at);
  `;
  try {
    await pool.query(query);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();
