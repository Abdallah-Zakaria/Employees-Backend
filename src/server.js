"use strict";

// Third Party Resources

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import Resources

const router = require("./router");
const notFoundHandler = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHanlder");

// App Level Middleware 

const app = express();
app.use(express.json());
app.use(cors());

// Routes 

app.get("/", (req, res) => {
  res.send("Welcome to employees API");
});

app.use("/api/v1", router);

app.use("*", errorHandler);
app.use(notFoundHandler);

// Export Module

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Up and running on ${port}`);
    });
  },
};

