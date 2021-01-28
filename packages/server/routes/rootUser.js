const router = require("express").Router();
const logger = require("../../utils/logger/logger");
const authencationToken = require("../../utils/authencation/authToken");
const UserController = require("../controller/user.controller");
const imageUpload = require("../controller/image-upload.controller");



router.route("/").post(UserController.createUser);
router.put("/", authencationToken, UserController.updateUser);
router.route("/login").post(UserController.login);
router.route("/").delete(UserController.deleteUser);
router.post("/upload", imageUpload);



module.exports = router;
