require("dotenv").config();
const app = require("./app/server");

app.listen(process.env.PORT, () =>
  console.log(`http://127.0.0.1:${process.env.PORT}`)
);
