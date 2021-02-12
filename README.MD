# Inspo.Rest

Inspo.Rest (Inspo) is a RESTful API created for cross platform for web and react native application of Inspo.

# New Features!

  - Saving user profile images throught Aws S3 Bucket. 
  - Saving user links.


### Tech

Inspo.Rest uses a number of open source projects to work properly:

* [ReactJs](https://reactjs.org/) - HTML enhanced for web apps!
* [Visual Studio Code](https://code.visualstudio.com/) - awesome text editor
* [Jest](https://jestjs.io/en/) - For Testing JavaScript.
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
* [jsonwebtoken](https://tools.ietf.org/html/rfc7519) - JSON Web Token for auth.


### Http Endpoints

#### User

* ##### Create New User 
    * http://localhost:5000/api/user
        * Token: Not Needed
        * Method: Get
        
* ##### Login Existing User
    * http://localhost:5000/api/user/login
        * Token: Needed
        * Method: Post

* ##### Updating Existing User
    * http://localhost:5000/api/user
        * Token: Needed
        * Method: Put

* ##### Delete Existing User
    * http://localhost:5000/api/user
        * Token: Needed
        * Method: Delete
