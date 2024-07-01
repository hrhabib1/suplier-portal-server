const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString:
   `https://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  
  pool
  .connect()
  .then(() => console.log("Connected to Aiven PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports={pool};