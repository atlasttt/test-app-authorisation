const { client } = require("../db");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dto/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const data = await client.query(query, values);
    return data.rows[0];
  }

  async registration(email, pass, username) {
    const candidate = await this.getUserByEmail(email);
    if (candidate) throw ApiError.BadRequest("User already exists");
    const password = await bcrypt.hash(pass, 10);
    const query =
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *";
    const values = [email, password, username];
    const user = await client.query(query, values);
    const userDto = new UserDto(user.rows[0]);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const query = "SELECT * FROM users";
    const users = await client.query(query);
    return users.rows.map((user) => ({ ...new UserDto(user) }));
  }

  async editUser(id, username) {
    const query = "UPDATE users SET username = $2 WHERE id = $1 RETURNING *";
    const values = [id, username];
    const user = await client.query(query, values);
    if (!user.rows[0]) throw ApiError.BadRequest("User not found");
    const userDto = new UserDto(user.rows[0]);
    return { ...userDto };
  }

  async login(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) throw ApiError.BadRequest("User not found");
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Invalid password");
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    return tokenService.removeToken(refreshToken);
  }

  async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [id];
    const user = await client.query(query, values);
    if (!user.rows[0]) throw ApiError.BadRequest("User not found");
    const userDto = new UserDto(user.rows[0]);
    return { ...userDto };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);

    console.log(userData);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const user = await this.getUserByEmail(userData.email);
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
