const bcrypt = require("bcrypt");
const logger = require('../logger/logger');
const passwordHashing = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

module.exports = passwordHashing;