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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username: username});
  logger.info(user);
  const responseMessage = {};

  if (!user) {
    responseMessage.message = "User Doesn't Exist";
    responseMessage.token = null;
    responseMessage.success = false;
    return res.json(responseMessage);
  }

  let isPasswordTheSameAsHashed = await compareHashedPassword(
    password,
    user.password
  );

  if (!isPasswordTheSameAsHashed) {
    responseMessage.message = "Password don't match!";
    responseMessage.token = null;
    responseMessage.success = false;
    return res.json(responseMessage);
  }
  responseMessage.message = "Token Granted";
  responseMessage.token = generateAccessToken(username);
  responseMessage.success = true;
  return res.json(responseMessage);
});

async function getIsEmailAndUsernameAvailable(user) {
  let { emailAddress, username } = user;
  let feedback = {};
  let isUsernameAvailable = await findByUsername(username);
  if (isUsernameAvailable) {
    feedback.message = "Username already exist";
    feedback.status = false;
    return feedback;
  }

  let isEmailAvailable = await findByEmail(emailAddress);
  if (isEmailAvailable) {
    feedback.message = "Email already exist";
    feedback.status = false;
    return feedback;
  }
  feedback.message = null;
  feedback.status = true;
  return feedback;
}



router.put("/", authencationToken, async (req, res) => {
  let user = ({
    firstName,
    lastName,
    username,
    password,
    emailAddress,
    phoneNumber,
  } = req.body);
  try {
    let isUserInfomationVaild = vaildateUserInfomation(user);
    if (isUserInfomationVaild[0]) {
      let isEmailAndUsernameAvailable = await getIsEmailAndUsernameAvailable(
        user
      );

      if (!isEmailAndUsernameAvailable.status) {
        res.send(isEmailAndUsernameAvailable.message);
        return;
      }

      user.password = await passwordHashing(password);
      let token = generateAccessToken({ username: user.username });
      res.json(token).status(201);
      return;
    } else {
      res.send(isUserInfomationVaild[1]).status(201);
      return;
    }
  } catch (err) {
    logger.error(err);
    res.send(err).status(501);
    return;
  }
});

router.delete("/", authencationToken, async (req, res) => {
  let user = ({ username, password } = req.body);
  let responseMessage = {};
  try {
    let isUserInDatabase = await findByUsername(user.username);
    if (!isUserInDatabase) {
      responseMessage.message = "User Doesn't Exist";
      responseMessage.status = false;
      return res.json(responseMessage);
    }

    let isPasswordAMatch = await compareHashedPassword(
      user.password,
      isUserInDatabase.password
    );
    
    if (!isPasswordAMatch) {
      responseMessage.message = "Password don't match!";
      responseMessage.status = false;
      return res.json(responseMessage);
    }

    let isUserDeleted = await User.deleteOne({ username: user.username });
    responseMessage.message = "User Has Been Deleted";
    responseMessage.status = true;
    return res.send(isUserDeleted);
  } catch (err) {
    logger.error(err);
    res.send(err).status(501);
    return;
  }
});

module.exports = router;
