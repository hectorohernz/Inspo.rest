const {sign} = require("jsonwebtoken");
require('dotenv').config({path:__dirname + "/../../.env"});
function generateAccessToken(username){
    return sign(username, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"50d"});
}
module.exports = generateAccessToken;