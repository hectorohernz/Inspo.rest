const passwordHashing = require('../../../utils/bcrypt/passwordHashing');
test('should Be Hashed Password', () => {
    // Input => omar
    // Output => hashed
    expect(passwordHashing("omar")).not.toBe("omar");
})
