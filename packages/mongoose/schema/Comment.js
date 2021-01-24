const {Schema} = "mongoose";

const commentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    quote: {
        type: Schema.Types.ObjectId,
        ref:"quotes"
    },
    comment:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});