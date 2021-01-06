const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const User = require("../../mongoose/schema/User"); // Bring in mongodb model ( Schema )
const passwordHashing = require("../../utils/bcrypt/passwordHashing");
const vaildateUserInfomation = require("../../utils/vaildation/userVaildation");
const generateAccessToken = require("../../utils/authencation/generateAccessToken");
const authencationToken = require("../../utils/authencation/authToken");
const compareHashedPassword = require("../../utils/bcrypt/compareHashedPassword");

// Find Username in the mongodb based on username
 const findByUsername = async (username) => {
  let user =  await User.findOne({ username }).exec();
  return user;
 }
 
 async function findByEmail(email){
   let user =  await User.findOne({ emailAddress: email }).exec();
  return user;
 }

router.get("/", authencationToken, async (req, res) => {
  const isUserInDatabase = await findByUsername(req.username);
  if(!isUserInDatabase){
    res.send("User Not Found In Database");
    return;
  }
  res.json(isUserInDatabase);
});


router.post("/login", async (req,res) => {
  const {username,password} = req.body;
  const user = await findByUsername(username);
  const responseMessage = {};

  if(!user){
    responseMessage.message = "User Doesn't Exist";
    responseMessage.token = null;
    responseMessage.success = false;
    return res.json(responseMessage);
  }
  
  let isPasswordTheSameAsHashed = await compareHashedPassword(password,user.password);

  if(!isPasswordTheSameAsHashed){
      responseMessage.message = "Password don't match!";
      responseMessage.token = null;
      responseMessage.success = false;
      return res.json(responseMessage);
  }
  responseMessage.message = "Token Granted";
  responseMessage.token = generateAccessToken(username);
  responseMessage.success = true;
  return res.json(responseMessage);
})

async function getIsEmailAndUsernameAvailable(user){
  let {emailAddress, username} = user;
  let feedback = {};
  let isUsernameAvailable = await findByUsername(username)
  if(isUsernameAvailable){
    feedback.message = "Username already exist";  
    feedback.status = false;
    return feedback;
  }

  let isEmailAvailable = await findByEmail(emailAddress);
  if(isEmailAvailable){
    feedback.message = "Email already exist";  
    feedback.status = false;
    return feedback;
  }
    feedback.message = null;  
    feedback.status = true;
    return feedback;
}

router.post("/", async (req, res) => {
  let user = {firstName, lastName, username, password, emailAddress, phoneNumber} = req.body;
  try {
    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();
    user.username = user.username.trim();
    let isUserInfomationVaild = vaildateUserInfomation(user);

    if(isUserInfomationVaild[0]){
        let isEmailAndUsernameAvailable = await getIsEmailAndUsernameAvailable(user);
        if(!isEmailAndUsernameAvailable.status){
          res.send(isEmailAndUsernameAvailable.message);
          return;
        }
        user.password = await passwordHashing(password); // Bcrypt Hashing Algorthim For Regular Password => Converted
        let newUser = new User(user);
        
        //await newUser.save(); // Saving New User To MongoDb
        let token = generateAccessToken(newUser.username);
        res.json(token).status(201);
    }else{
      res.send(isUserInfomationVaild[1]).status(201);
    }
  } catch (err) {
    logger.error(err);
    res.send(err).status(501);
  }
});

module.exports = router;
