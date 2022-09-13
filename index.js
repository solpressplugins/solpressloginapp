import express from "express";
import routes from "./src/routes/solanaRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
require("dotenv").config()

const app = express();
const PORT = process.env.PORT;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/SolanaDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
    res.send(`Node & express server is running on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`My pretty server is running on port ${PORT}`)
}) 

