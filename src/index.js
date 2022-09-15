import express from "express";
import routes from "./routes/solanaRoutes";
import bodyParser from "body-parser";
import db from "./lib/db";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

db.open()
.then(() => {
    //bodyParser setup
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    routes(app);

    app.get("/", (req, res) => {
      res.send(`Node & express server is running on port ${PORT}`);
    });

    app.listen(PORT, () => {
      console.log(`My pretty server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

