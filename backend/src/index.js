const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());

// route
const loginRoute = require("./routes");

app.use(loginRoute);

app.listen(port, () => console.log(`this app listen on: ${port}`));
