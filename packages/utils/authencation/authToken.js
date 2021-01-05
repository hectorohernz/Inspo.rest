const {verify} = require("jsonwebtoken");
require('dotenv').config({path:__dirname + "/../../.env"});
const logger = require("../../utils/logger/logger");
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.username = user.username;
      logger.info(req.user);
      next() // pass the execution off to whatever request the client intended
    })
  }

  module.exports = authenticateToken;