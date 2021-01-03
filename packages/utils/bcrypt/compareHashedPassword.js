const bcrypt = require("bcrypt");
const logger = require('../logger/logger');
const compareHashedPassword = async (plainPassword, hashedPassword) => {
    let correct  = await bcrypt.compare(plainPassword, hashedPassword);
    return correct;
}

module.exports = compareHashedPassword;