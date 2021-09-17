"use strict";

// Third Party Resources

var faker = require("faker");

// Import Resources

const client = require("./database");

// Seed  Module 

class Seed {
  randomData(i) {
    const name = faker.name.findName().replace(/'/g, "");
    const email = faker.internet.email(`${name}${i}}`);
    const depart_id = faker.datatype.number({ min: 1, max: 10 });
    const avatar = faker.image.avatar();
    return `('${name}', '${email}', ${depart_id}, '${avatar}')`;
  }

  employeesQuery(num) {
    let query = ``;
    for (let i = 0; i < num; i++) {
      query += this.randomData(i);
      if (i + 1 < num) query += ", ";
    }
    return query;
  }


  departmentsQuery() {
    let query = ``;
    const departments = [
      "Operations",
      "Human resources",
      "Delivery",
      "Sales",
      "Marketing",
      "Finance",
      "IT",
      "Procurement",
      "Quality",
      "Security",
    ];
    for (let i = 0; i < departments.length; i++) {
      query += `('${departments[i]}')`;
      if (i + 1 < departments.length) query += ", ";
    }
    return query;
  }

  async emptyDB() {
    const SQL1 = `DROP TABLE IF EXISTS employees,departments;`;
    const SQL2 = `CREATE TABLE IF NOT EXISTS departments(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
      );`;
    const SQL3 = `CREATE TABLE IF NOT EXISTS employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        avatar VARCHAR(255) NOT NULL,
        depart_id INT REFERENCES departments (id)
        );
        `;
    const SQL4 = `CREATE INDEX employees_name_idx ON employees (name);`;
    const SQL5 = `CREATE INDEX employees_email_idx ON employees (email);`;

    await client.query(SQL1);
    await client.query(SQL2);
    await client.query(SQL3);
    await client.query(SQL4);
    await client.query(SQL5);
  }

  async insertData(num) {
    await this.emptyDB();
    console.log('Data removed');
    const SQL1 = `INSERT INTO departments (name) VALUES ${this.departmentsQuery()};`;
    const SQL2 = `INSERT INTO employees (name,email,depart_id,avatar) VALUES ${this.employeesQuery(num)};`;
    await client.query(SQL1);
    await client.query(SQL2);
    console.log('Data inserted');
  }
}

// Export Module

module.exports = new Seed();

