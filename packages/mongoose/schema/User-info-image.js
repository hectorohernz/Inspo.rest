const mongoose = require("mongoose");

let UserImage = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    imagePath:{
        type:String
    }
})

module.exports = UserImage = mongoose.model("UserImage", UserImage);
