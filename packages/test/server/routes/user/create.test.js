const request = require('supertest');
const app = require("../../../../server/index");

describe('Create new User.', () => {
    it("Create New User", async () => {
        const res = await request(app)
        .post("/api/user")
        .send({"user":{
            "firstName":"john",
            "lastName": "doe",
            "username":"johndoe",
            "password":"johndoe",
            "emailAddress":"johndoe@gmail.com",
            "phoneNumber":7235454877,
            "gender": "m"
            }})
        expect(res.statusCode).toEqual(200);
    })
})
