const jwt = require("jsonwebtoken");
const { client } = require("../db");

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const query =
      "UPDATE users SET refresh_token = $2 WHERE id = $1 RETURNING *";
    const values = [userId, refreshToken];
    const data = await client.query(query, values);
    return data.rows[0];
  }

  async removeToken(refreshToken) {
    const query =
      "UPDATE users SET refresh_token = null WHERE refresh_token = $1";
    const values = [refreshToken];
    return await client.query(query, values);
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const query = "SELECT * FROM users WHERE refresh_token = $1";
    const values = [refreshToken];
    const data = await client.query(query, values);
    return data.rows[0];
  }
}

module.exports = new TokenService();
