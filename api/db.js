const Pool = require("pg").Pool;
const migrate = require("node-pg-migrate").default;
const { join } = require("path");

const dbconfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pool = new Pool(dbconfig);

const migrateUp = async () => {
  await migrate({
    direction: "up",
    migrationsTable: "migrations",
    dir: join(__dirname, "migrations"),
    databaseUrl: dbconfig,
    log: (...args) => {
      console.log(...args);
    },
    noLock: true,
    singleTransaction: true,
    schema: "public",
  });
};

pool.on("connect", () => {
  console.log("connected to the db");
});

module.exports = {
  client: pool,
  migrateUp,
};
