require("dotenv").config();
const app = require("./views/app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App Running On : http://localhost:${port}`);
});
