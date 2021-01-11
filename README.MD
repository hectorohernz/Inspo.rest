# INSPO.REST

Road Map 
- [x] Get Request for user 
    - [x] Authencation Token JWT To Access
        - [x] Return User | Return Message and Status 404
- [x] Post Request for User for creating profile
- [x] Post For Log In 
    - [x] Check Username 
        - If User Exist continue | Else Message To Client 
        - [x] Check Password 
            - [x] Compare Password with bcrypt
            - [x]  If Password & Username match continue || else Send Message
            - [x] Send JWT 
- [ ] Put Request for User
     - [ ] Authencation Token JWT To Access
- [ ] Delete Request for User 
- [ ] Authencation Token JWT To Access

- Test User Routes with Jest and Insommia
    - [ ]  Test getting a user that exist in the database based on username and password => return jwt token 
    - [ ]  Test updating a user that exist in the database => Return new jwt token 
        - [ ] New Username && Username that already exist in the database => return username must be unique
        - [ ] Update password and hash new password 
    - [ ] Test creating a new user 
    - [ ] Test deleting a user 

- Jan/10 Note 
    - Keep testing endpoints for auth & jwt