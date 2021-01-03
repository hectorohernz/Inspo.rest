const mongoose = require("mongoose");

// User Schema 
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    emailAddress:String,
    phoneNumber: Number,
    dateCreated:{ type : Date, default: Date.now }
})

module.exports = User = mongoose.model('User', userSchema);
