const generateAccessToken = require("../../../utils/authencation/generateAccessToken");
const logger = require("../../../utils/logger/logger");
test('should return jwt token ', () => {    
    let token = generateAccessToken({username:"john"});
    logger.info(token);
    expect(token).not.toBe("john");
})
