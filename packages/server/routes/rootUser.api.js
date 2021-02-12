const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const authencationToken = require("../../utils/authencation/authToken");
const UserController = require("../controller/user.controller");


router.route("/").post(UserController.createUser);
router.put("/", authencationToken, UserController.updateUser);
router.route("/login").post(UserController.login);
router.route("/").delete(UserController.deleteUser);




module.exports = router;
