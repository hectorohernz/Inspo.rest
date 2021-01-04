const vaildateEmail = require("./emailVaildation");
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

  module.exports = vaildateUserInfomation;