const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const client = require("./db");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

app.use(errorMiddleware);

app.listen(port, async () => {
  try {
    await client.migrateUp();
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
