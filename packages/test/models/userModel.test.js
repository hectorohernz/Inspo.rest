const User = require("../../mongoose/schema/User");
const logger = require("../../utils/logger/logger");
const mongoose = require('mongoose');

let testUser = {
    firstName: "test",
    lastName:"test",
    username: "test",
    password: "Password1",
    emailAddress:"test1@gmail.com",
    phoneNumber: 70356568477,
}

describe('User Model Test',  () => {
    beforeAll(async () => {
         await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
      });
    
    test('should create a new user with hashed password', async () => {
        let user = new User(testUser);
        let savedUser = await user.save();
        expect(savedUser.password).not.toBe(testUser.password);
    })

})
