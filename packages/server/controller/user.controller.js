const User = require("../../mongoose/schema/User");
const generateAccessToken = require("../../utils/authencation/generateAccessToken");
const UserVaildationHelper = require("../../utils/vaildation/UserSchemaVaildationHelper");
const comparePassword = require("../../utils/bcrypt/compareHashedPassword");
const UserInfo = require("../../mongoose/schema/User-info");

const createUser = async (req, res) => {
  const user = req.body.user;
  let newUser = new User(user);
  try {
    await newUser.save();
    let token = generateAccessToken(newUser._id);
    let userInfomation = new UserInfo({
      user: newUser.id,
      profileImageUrl:null
    });
    await userInfomation.save();
    return res.status(200).json({
      message: "Successfully signed up!",
      token: token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: UserVaildationHelper(error), status: false });
  }
};

const updateUser = async (req, res) => {
  let user = req.body.user;
  try {
    await User.findOneAndUpdate({ _id: req._id }, user, {
      runValidators: true,
    });
    let token = generateAccessToken(user._id);
    return res.status(200).json({
      message: "Successfully updated account",
      token: token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: UserVaildationHelper(error), status: false });
  }
}; 

const getUser = async (req, res) => {};

const login = async (req, res) => {
  const user = ({ username, password } = req.body);
  console.log(user);
  try {
    let getUser = await User.findOne({username:username});
    if (!getUser) {
      return res.status(400).json({
        message: "User Doesn't Exist",
        status: false,
      });
    }

    const isMatch = await comparePassword(user.password, getUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password Doesn't Match",
        status: false,
      });
    }

    let token = generateAccessToken(getUser._id);

    return res.status(200).json({
      message: "Successfully Login",
      status: true,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ error: UserVaildationHelper(err) });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req._id});
    return res.status(200).json({
      message: "Successfully Deleted User",
    });
  } catch (error) {
    return res.status(400).json({
      error: UserVaildationHelper(error),
      status: false,
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
  deleteUser,
  getUser,
};
