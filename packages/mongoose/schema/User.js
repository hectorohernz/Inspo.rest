const mongoose = require("mongoose");
const passwordHashing = require("../../utils/bcrypt/passwordHashing");
const comparePassword = require("../../utils/bcrypt/compareHashedPassword");
const logger = require("../../utils/logger/logger");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength:1,
    required: "First name is required",
  },
  lastName: {
    type: String,
    minlength:1,
    required: "Last name is required",
  },
  username: {
    type: String,
    required: "Username is required",
    minlength:3,
    trim: true,
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: "password is required",
  },
  emailAddress: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true,'Email already exists'],
    match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please fill a vaild email address"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: "Phone Number is required",
    unique: 'Phone Number already exists',
    min:[10,"Phone number must be 10 digits."]
  },
  gender: {
    type: String,
    enum: ["m", "w", "o", null]
  },
  dateCreated: { type: Date, default: Date.now },
});

userSchema.virtual("fullName").get( () => {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await passwordHashing(user.password);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  let password = this._update.password;
  this._update.password = await passwordHashing(password);
  next();
});




userSchema.methods.comparePassword = async (candidatePassword) => {
  let isMatch = await comparePassword(candidatePassword, this.password);
  return isMatch;
};

module.exports = User = mongoose.model("User", userSchema);
