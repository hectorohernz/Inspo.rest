const bcrypt = require("bcrypt");
const logger = require('../logger/logger');
const compareHashedPassword = (plainPassword, hashedPassword) => {
    logger.info(`Plain Password: ${plainPassword}, Hashed Password:${hashedPassword}`);
    bcrypt.compare(plainPassword, hashedPassword, (err, res) =>{
        if(res === true){
            return true;
        }else{
            return false;
        }
      });
}

module.exports = compareHashedPassword;