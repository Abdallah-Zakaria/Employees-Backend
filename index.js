'use strict';

// Third Party Resources

require('dotenv').config();

// Import Resources

const server = require('./src/server');
const client = require('./src/models/database');
const seed = require('./src/models/seed');

// Esoteric Resources

const PORT = process.env.PORT;

// Server Connection

client.connect().then(async ()=>{
  await seed.insertData(1000);
  server.start(PORT);
}).catch((err) => {
  console.error(err.message);
});


