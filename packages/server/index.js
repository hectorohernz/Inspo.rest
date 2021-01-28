const express = require("express");
const cors = require("cors");
const logger = require("../utils/logger/logger");
const bodyParser = require('body-parser');
const localConfig = require('../config/localConfig.json');
require('dotenv').config({path:__dirname + "/../.env"});
const connectToMongo = require("../mongoose/mongoose");
const app = express();
const PORT = localConfig.port || process.env.PORT;

connectToMongo();

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(bodyParser.json()); // support json encoded bodies
app.use("/api/user", require("./routes/rootUser.api"));
app.use("/api/info", require("./routes/UserInfo.api"));


app.listen(PORT, () =>{
    console.log(`"http://localhost:${PORT}`);
})

