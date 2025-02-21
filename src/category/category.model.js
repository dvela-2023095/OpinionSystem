import { Schema,model } from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type:String,
            required:[true,'Category name is required'],
            unique: [true,'This Category already exist'],
            maxlength:[35,`Can't overcome 35 characters`]
        }
    },
    {
        timestamps:true
    }
)

export default model('Category',categorySchema)