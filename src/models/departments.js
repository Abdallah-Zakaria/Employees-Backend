"use strict";

// Import Resources 

const client = require("./database");

// Departments Module 

class Departments {
  async getAll() {
    const SQL = `SELECT id AS depart_id,name FROM departments;`;
    const data = await client.query(SQL);
    return { count: data.rows.length, data: data.rows };
  }
}

// Export Module

module.exports = new Departments();

