const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const User = require("../../mongoose/schema/User"); // Bring in mongodb model ( Schema )
const passwordHashing = require("../../utils/bcrypt/passwordHashing");
const vaildateUserInfomation = require("../../utils/vaildation/userVaildation");
const generateAccessToken = require("../../utils/authencation/generateAccessToken");
const authencationToken = require("../../utils/authencation/authToken");


 const findByUsername = async (username) => {
  let user =  await User.findOne({ username }).exec();
  return user;
 }
 
 async function getIsEmailAvailable(email){
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


router.post("/login", (req,res) => {
  // Get User 
  // Check Username => true => Check password => false => send reponse 
  // if password is correct => send user data & token => else => reponse
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
        
        //await newUser.save(); // Saving New User To MongoDb
        let token = generateAccessToken({username:newUser.username});
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
