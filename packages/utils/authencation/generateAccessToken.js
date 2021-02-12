const {sign} = require("jsonwebtoken");
require('dotenv').config({path:__dirname + "/../../.env"});
function generateAccessToken(_id){
    return sign({id:_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"50d"});
}
module.exports = generateAccessToken;