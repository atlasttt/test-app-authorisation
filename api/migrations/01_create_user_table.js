exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true },
    password: { type: "varchar(100)", notNull: true },
    refresh_token: { type: "varchar(500)", notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
