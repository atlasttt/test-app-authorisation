const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.UnauthorizedError());
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(token);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
