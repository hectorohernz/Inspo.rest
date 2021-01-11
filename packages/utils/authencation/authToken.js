const {verify} = require("jsonwebtoken");
require('dotenv').config({path:__dirname + "/../../.env"});
const logger = require("../../utils/logger/logger");
let User = require("../../mongoose/schema/User");
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403)

      let isUserAlive = await User.findOne({username: user.username});
      if(!isUserAlive) return res.sendStatus(403);


      req.username = user.username;
      next() // pass the execution off to whatever request the client intended
    })
  }

  module.exports = authenticateToken;