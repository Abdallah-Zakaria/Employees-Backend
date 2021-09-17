'use strict';

// Export The Module

module.exports = (err, req, res, next) => {
  res.status(err.status).json({error : err.message});
};

