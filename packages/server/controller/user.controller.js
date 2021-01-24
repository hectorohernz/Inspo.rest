const User = require("../../mongoose/schema/User");
const generateAccessToken = require("../../utils/authencation/generateAccessToken");
const UserVaildationHelper = require("../../utils/vaildation/UserSchemaVaildationHelper");
const comparePassword = require("../../utils/bcrypt/compareHashedPassword");

const createUser = async (req, res) => {
  const user = req.body.user;
  let newUser = new User(user);
  try {
    await newUser.save();
    let token = generateAccessToken(newUser.username);
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
    await User.findOneAndUpdate({ username: req.username }, user, {
      runValidators: true,
    });
    let token = generateAccessToken(user.username);
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
    let getUser = await User.findOne({ username: user.username });
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

    let token = generateAccessToken(getUser.username);

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
    await User.deleteOne({ username: req.username });
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
