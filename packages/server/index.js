const express = require("express");
const logger = require("../utils/logger/logger");
const bodyParser = require('body-parser');
const localConfig = require('../config/localConfig.json');
const app = express();
const PORT = localConfig.port || process.env.PORT;

app.use(bodyParser.json()); // support json encoded bodies
app.use("/user", require("./routes/rootUser.js"));


app.get("/",(req,res) => {
    logger.info("Home Page");
    res.send("Home Route");
} )


app.listen(PORT, () =>{
    console.log(`"http://localhost:${PORT}`);
})

