const {Schema} = "mongoose";

const UserInfoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    profileImage:{
        url: String
    },
    meta:[{
        title:String,
        link:String
    }]
})
