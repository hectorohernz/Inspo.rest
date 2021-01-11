const express = require("express");
const logger = require("../utils/logger/logger");
const bodyParser = require('body-parser');
const localConfig = require('../config/localConfig.json');
require('dotenv').config({path:__dirname + "/../.env"});
const connectToMongo = require("../mongoose/mongoose");
const app = express();
const PORT = localConfig.port || process.env.PORT;

connectToMongo();
app.use(bodyParser.json()); // support json encoded bodies
app.use("/api/user", require("./routes/rootUser"));

app.listen(PORT, () =>{
    console.log(`"http://localhost:${PORT}`);
})

