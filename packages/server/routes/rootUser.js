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


function vaildateEmail(email){
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
async function getIsUsernameAvailable(username){
 let user =  await User.findOne({ username }).exec();
 return user;
}


function vaildateUserInfomation(user){
  if(typeof user.firstName !== "string" || user.firstName.length === 0){
    return [false, "Enter A Vaild First Name"]
  }
  if(typeof user.lastName !== "string" || user.lastName.length === 0){
    return [false, "Enter A Vaild Last Name"]
  }
  if(typeof user.username !== "string" || user.username.length === 0){
    return [false, "Enter A Vaild  Username"]
  }
  // check if user exist
  if(typeof user.password !== "string" || user.password.length === 0){
    return [false, "Enter A Vaild Password"]
  }
  
  if(typeof user.emailAddress !== "string" || user.emailAddress.length === 0 || !vaildateEmail(user.emailAddress) ){
    return [false, "Enter A Vaild Email"];
  }

  if(typeof user.phoneNumber !== "number"){
    return [false, "Enter A Vaild Phone Number"];
  }else{
    let numberLength = user.phoneNumber.toString().length;
    if(numberLength !== 10){
      return [false, "Phone number must be 10 digits"];
    }
  }
  return [true];
};


router.post("/", async (req, res) => {
  let user = {firstName, lastName, username, password, emailAddress, phoneNumber} = req.body;
  try {
    let isUserInfomationVaild = vaildateUserInfomation(user);
    if(isUserInfomationVaild[0]){
      let isUsernameAvailable = await getIsUsernameAvailable(user.username)
        if(isUsernameAvailable){
          res.send("Username already exist");
          return;
        }
        user.password = await passwordHashing(password); // Bcrypt Hashing Algorthim For Regular Password => Converted
        let newUser = new User(user);
        //await newUser.save(); // Saving New User To MongoDb
        res.send(newUser).status(201);
    }else{
      res.send(isUserInfomation[1]).status(201);
    }
  } catch (err) {
    logger.error(err);
    res.send(false).status(501);
  }
});

module.exports = router;
