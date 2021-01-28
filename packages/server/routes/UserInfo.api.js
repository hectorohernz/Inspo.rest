const router = require("express").Router();
const authencationToken = require("../../utils/authencation/authToken");
const UserInfoController = require("../controller/info.controller");


router.post("/", authencationToken, UserInfoController.uploadImage);


module.exports = router;
