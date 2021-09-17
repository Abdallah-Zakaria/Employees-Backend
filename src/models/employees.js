"use strict";

// Import Resources

const client = require("./database");

// Employees  Module

class Employees {
  async getEmployee({ depart_id, query, searchType, page }) {
    if (searchType !== 'email' && searchType !== 'name' && searchType !== undefined || !page) throw { status: '400', message: "Worng parmeters" };
    const limit = 10;
    const offset = (page - 1) * limit;
    const logical = ['', ' WHERE', ' AND'];
    let index = [0, 0];
    if (query) {
      index[0] = 1;
      if (depart_id) {
        index[1] = 2;
      }
    } else if (depart_id) {
      index[0] = 1;
    }
    const basic1 = `SELECT email ,avatar ,employees.id AS id ,COUNT(*) OVER() AS count ,departments.name AS depart_name, employees.name AS name FROM employees JOIN departments ON employees.depart_id=departments.id`;
    const condition1 = ` depart_id=${depart_id}`;
    const condition2 = ` employees.${searchType} ~* '${query}'`;
    const basic2 = ` OFFSET ${offset} LIMIT ${limit};`;
    const SQL = basic1 + logical[index[0]] + (depart_id ? condition1 : "") + logical[index[1]] + (query ? condition2 : "") + basic2;
    const data = await client.query(SQL);
    return { page: Number(page), count: data.rows[0].count, data: data.rows };
  }
}

// Export Module

module.exports = new Employees();
