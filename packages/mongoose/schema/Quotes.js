const {Schema} = "mongoose";

const quotesSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    quotes: String,
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comment:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    meta:{
       
    }
})