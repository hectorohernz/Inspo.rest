const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const User = require("../../mongoose/schema/User"); // Bring in mongodb model ( Schema )
const passwordHashing = require("../../utils/bcrypt/passwordHashing");
const generateAccessToken = require("../../utils/authencation/generateAccessToken");
const authencationToken = require("../../utils/authencation/authToken");
const compareHashedPassword = require("../../utils/bcrypt/compareHashedPassword");
const UserController = require("../controller/user.controller");

router.route("/").post(UserController.createUser);
router.put("/",authencationToken, UserController.updateUser);
router.route("/login").post(UserController.login);

router.get("/", authencationToken, async (req, res) => {
  const isUserInDatabase = await findByUsername(req.username);
  let user = ({
    firstName,
    lastName,
    username,
    emailAddress,
    phoneNumber,
    _id,
  } = isUserInDatabase);

  res.json(user);
});


module.exports = router;
