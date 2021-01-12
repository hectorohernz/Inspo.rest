const User = require("../../mongoose/schema/User");
const generateAccessToken = require("../../utils/authencation/generateAccessToken"); 
const UserVaildationHelper = require("../../utils/vaildation/UserSchemaVaildationHelper");
const createUser = async (req,res) => {
    const user = req.body.user;
    let newUser = new User(user);
    try {
        await newUser.save();
        let token = generateAccessToken(newUser.username);
        return res.status(200).json({
            message: "Successfully signed up!",
            token:token
        });
    } catch (error) {
        return res.status(400).json({error:UserVaildationHelper(error)});
    }
};

const updateUser = async (req,res) => {
    let user = req.body.user;
      try {
        await User.findOneAndUpdate({username:req.username}, user,{ runValidators: true });
        let token = generateAccessToken(user.username);
        return res.status(200).json({
            message: "Successfully updated account",
            token:token
        });
    } catch (error) {
        return res.status(400).json({error:UserVaildationHelper(error)});
    }
}


/*
const getUser = async (req,res) => {


}

*/

const deleteUser = async (req,res) => {
    try {
        await User.deleteOne({username:req.username});
        return res.status(200).json({
            message: "Successfully Deleted User"
        })
    } catch (error) {
        return res.status(400).json({error:UserVaildationHelper(error)});
    }
};



module.exports = {
    createUser,
    updateUser
}