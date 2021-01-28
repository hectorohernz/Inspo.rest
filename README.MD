# INSPO.REST

INSPO.REST is a web app backend for INSPO frontend web applcation. 

Inspo is a widget template based social networking web application.

Inspo is idea sounds mood boards of different people and allowing people to have the opportunity to customize their profile. 

Thrive. Create. Explr


## Still Under Development
Inspo.Rest is an api for 
- Creating User 
    - [ ] Test Empty Last Name
    - [ ] Test Empty First Name
    - [ ] Test Empty Email and invaild email and already used email
    - [ ] Test Empty username and already used username and empty
    - [ ] Test Empty password 
    - [ ] Test already used phone number and empty
    - [ ] Test invaild option for gender and empty
- Deleting User
- Updating User
- Getting User
and Much more.

User Fields: {
    firstName:{
        Must not be empty,
        required
    },
    lastName: {
        Must Not Be Empty,
        required
    },
    username: {
        Must not be empty,
        must be unqiue,
        required
    },
    password: {
        Must not be empty,
        required
    }
    emailAddress: {
        Must be a vaild email address,
        unqiue,
        required,
    },
    phoneNumber:{
        unqiue,
        required,
        Must be 10 digits
    }
    "gender: {
        "m" = male,
        "f" = Female,
        "o" = other,
        null 
    }
}
### Creating a new user in Database

Url: http://localhost:5000/api/user/

Method: POST

Success Reponse Message : {
    Status Code : 200,
    message: "Successfully signed up!",
    token: token,
}

Error Message : {
    Status Code : 400,
    Error: Error Message
}

Sample Request Body : {
	"user":{
	"firstName":"John",
	"lastName": "Doe",
	"username":"doe123",
	"password":"doe123",
	"emailAddress":"doe123@gmail.com",
	"phoneNumber":1234567890,
	"gender": "m"
	}
}

