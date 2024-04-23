const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

function validateBody(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ApiError.BadRequest("Validation error", errors.array()));
  }
}

module.exports = {
  validateBody,
};
