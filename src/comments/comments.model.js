import { Schema,model } from "mongoose";

const commentsSchema = Schema(
    {
        author:{
            type:Schema.Types.ObjectId,
            required:[true,'Author is required'],
            ref:'User'
        },
        comment:{
            type:String,
            required:[true,'Comment is required'],
            maxlength:[500,`Can't overcome 500 characters`]
        },
    }
)

export default model('Comment',commentsSchema)