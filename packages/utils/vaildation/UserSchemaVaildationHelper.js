const logger = require("../logger/logger");
const convertFieldForMessage = (field) => {
  switch (field) {
    case "firstName":
      return "First Name";

    case "lastName":
      return "Last Name";

    case "username":
      return "Username";

    case "password":
      return "Password";

    case "emailAddress":
      return "Email Address";

    case "phoneNumber":
      return "Phone Number";
  }
};

const customErrorHelper = (errorMessage) => {
  logger.info(errorMessage);
  const listOfError = [];

  /*
        Checks for unqiueness in the database 
        If the code is 11000
        
    */

  if (errorMessage.name === "MongoError" && errorMessage.code === 11000) {
    let fieldOfErrors = errorMessage.keyPattern;
    for (const field in fieldOfErrors) {
      let message = "";
      message = `${convertFieldForMessage(field)} already exists`;
      listOfError.push(message);
    }
    return listOfError;
  } 

  if(errorMessage.errors.length !== 0){
    for (let errName in errorMessage.errors) {
      if (errorMessage.errors[errName].message) {
        let message = errorMessage.errors[errName].message;
        listOfError.push(message);
      }
    }
    return listOfError;
  }

  return errorMessage
};

module.exports = customErrorHelper;
