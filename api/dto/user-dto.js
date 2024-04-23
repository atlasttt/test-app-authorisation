module.exports = class UserDto {
  id;
  email;
  username;

  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
  }
};
