const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    profileImageUrl:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userimage"
    },
    meta:[{
        title:String,
        link:String
    }]
})

module.exports =  UserInfo = mongoose.model("UserInfo", UserInfoSchema);