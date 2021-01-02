const decryptPassword = require("../../../utils/bcrypt/compareHashedPassword");
const user = require('./userTest.json');

test('should decypt stored password', () => {
    expect(decryptPassword("omar", user.password)).not.toBe(false);
})
