const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const server = require("./database/startserver");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" }));

const genresRoutes = require("./routes/movies_router");
const routerFile = require("./routes/user_router");

app.use("/api/movies", genresRoutes);
app.use("/api/user", routerFile);

app.get("/", (req, res) => {
  try {
    let data = null;
    let newdata = data.name;
    logger.info("Hello, World requested!");
    res.send("Hello World!").status(200);
  } catch (err) {
    logger.error(`Error : ${err.message}`);
    res.send("error occured!").status(500);
  }
});

server.startServer(app);
