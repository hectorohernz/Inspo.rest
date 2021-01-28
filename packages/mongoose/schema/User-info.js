const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.String,
        ref: "users"
    },
    profileImageUrl:{
        type:String
    },
    meta:[{
        title:String,
        link:String
    }]
})

module.exports =  UserInfo = mongoose.model("UserInfo", UserInfoSchema);