const {validationResult} = require('express-validator');

function errorHandler(req, res) {
  const errors = validationResult(req);
  const extractedErrors = [];
  if (!errors.isEmpty()) {
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  }

  return extractedErrors;
};

module.exports = {
  errorHandler,
};