import { Schema,model } from "mongoose";

const commentsSchema = Schema(
    {
        author:{
            type:String,
            required:[true,'Author is required'],
            ref:'User',
            maxlength:[30,'Cant overcome 30 characters'],
            minlength:[5,'Cant overcome 30 characters']
        },
        comment:{
            type:String,
            required:[true,'Comment is required'],
            maxlength:[500,`Can't overcome 500 characters`],
            minlength:[30,'Cant overcome 30 characters']
        },
    },
    {
        timestamps:true
    }
)

export default model('Comment',commentsSchema)