const bcrypt = require("bcrypt");
const logger = require('../logger/logger');
const compareHashedPassword = async (password, hashedPassword) => {
    let correct  = await bcrypt.compare(password, hashedPassword);
    return correct;
}

module.exports = compareHashedPassword;