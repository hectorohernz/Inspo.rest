const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const User = require("../../mongoose/schema/User"); // Bring in mongodb model ( Schema )
const passwordHashing = require("../../utils/bcrypt/passwordHashing");

router.get("/", (req, res) => {
  const { password, username } = req.body;
  logger.info(username);
  logger.info(password);
  // If user exist // check password
  // if password is correct return info
  // else
  // else return not exist
  res.send("Api Workings");
});

router.post("/", async (req, res) => {
  let {firstName, lastName, username, password, emailAddress, phoneNumber} = req.body;
  try {
    password = await passwordHashing(password); // Bcrypt Hashing Algorthim For Regular Password => Converted
    let newUser = new User({
      firstName,
      lastName,
      username,
      password,
      emailAddress,
      phoneNumber
    });
    await newUser.save(); // Saving New User To MongoDb
    res.send(newUser).status(201);
  } catch (err) {
    logger.error(err);
    res.send(false).status(501);
  }
});

module.exports = router;
