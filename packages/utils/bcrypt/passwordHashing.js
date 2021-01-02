const bcrypt = require("bcrypt");
const logger = require('../logger/logger');
const passwordHashing = (password) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err,salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            logger.info(hash);
            return hash;
        });
    })
}

module.exports = passwordHashing;