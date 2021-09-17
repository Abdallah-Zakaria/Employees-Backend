"use strict";

// Third Party Resources

const express = require("express");

// Import Resources

const employeesModule = require("../models/employees");
const departmentsModule = require("../models/departments");

// App Level Middleware

const router = express.Router();

// Routes

router.get("/search", async (req, res, next) => {

});

router.get("/departments", async (req, res, next) => {
  try {
    const data = await departmentsModule.getAll();
    res.status("200").json(data);
  } catch (err) {
    next(err);
  }
});

// Export Module

module.exports = router;
