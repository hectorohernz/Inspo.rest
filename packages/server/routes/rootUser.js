const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const User = require("../../mongoose/schema/User"); // Bring in mongodb model ( Schema )
const passwordHashing = require("../../utils/bcrypt/passwordHashing");
const vaildateUserInfomation = require("../../utils/vaildation/userVaildation");

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



async function getIsUsernameAvailable(username){
 let user =  await User.findOne({ username }).exec();
 return user;
}

async function getIsEmailAvailable(email){
  let user =  await User.findOne({ emailAddress: email }).exec();
 return user;
}

async function getIsEmailAndUsernameAvailable(user){
  let {emailAddress, username} = user;
  let feedback = {};
  let isUsernameAvailable = await getIsUsernameAvailable(username)
  if(isUsernameAvailable){
    feedback.message = "Username already exist";  
    feedback.status = false;
    return feedback;
  }

  let isEmailAvailable = await getIsEmailAvailable(emailAddress);
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
        
        // We want to set up jsonwebtoken 
        
        //await newUser.save(); // Saving New User To MongoDb
        res.json(newUser).status(201);
    }else{
      res.send(isUserInfomationVaild[1]).status(201);
    }
  } catch (err) {
    logger.error(err);
    res.send(false).status(501);
  }
});

module.exports = router;
