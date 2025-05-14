import { Schema,model } from "mongoose";

const opinionSchema = Schema(
    {
        tittle:{
            type:String,
            required:[true,'Title is required'],
            maxlength:[50,`Can't overcome 50 characters`]
        },
        category:{
            type:Schema.Types.ObjectId,
            required:[true,'Category is required'],
            ref:'Category'
        },
        text:{
            type:String,
            required:[true,'Text is required'],
            maxlength:[1000,`Can't overcome 1000 characters`]
        },
        comments:{
            type:[
                {
                    type:Schema.Types.ObjectId,
                    ref:'Comment'
                }
            ]
        }
    },
    {
        timestamps:true
    }
)

export default model('Opinion',opinionSchema)