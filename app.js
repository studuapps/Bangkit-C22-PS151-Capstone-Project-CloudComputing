/* 
  @ IMPORT MODULES 
*/
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const router = require("./routes/router");

/* 
  @ UTILS 
*/
const port = process.env.PORT || 5000;
const hostname = require("./utils/host");

dotenv.config();

/* 
  @ APP 
*/
const app = express();

/* 
  @ CONFIG
*/
app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* 
  @ ROUTES
*/
app.use(router);

const httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`Server running in ${hostname} on port ${port}`));
