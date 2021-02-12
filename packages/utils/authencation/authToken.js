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

      let isUserAlive = await User.findOne({_id: user.id});

      if(!isUserAlive) return res.sendStatus(403);
      let id = isUserAlive._id;
      req.id = user.id;
      next() // pass the execution off to whatever request the client intended
    })
  }

  module.exports = authenticateToken;