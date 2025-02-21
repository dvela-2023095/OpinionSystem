import { Schema,model } from "mongoose";

const usersSchema = Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            maxlength:[25,`Can't overcome 25 characters`]
        },
        surname:{
            type:String,
            required: [true, 'Surname is required'],
            maxlength:[25,'Cant overcome 25 characters']
        },
        username:{
            type: String,
            required: [true, 'Surname is required'],
            unique:[true,'Username is already taken'],
            lowercase:true,
            maxlength:[15, `Cant overcome 15 characters`]
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique:[true,'This email is already taken'],
            lowercase:true
        },
        password:{
            type: String,
            require: [true, 'Surname is required'],
            minLength:[8, 'Password mus be 8 characters'],
            maxlength:[100, `Can't be overcome 16 characters`],
        },
        role:{
            type:String,
            required:[true,'Role is required'],
            uppercase:true,
            enum:['ADMIN','USER']
        },
        status:{
            type:Boolean,
            required:[true,'Status is required']
        }
    },
    {
        timestamps:true
    }
)

usersSchema.methods.toJSON = function(){
    const {__v, password,...user} = this.toObject()
    return user
}

export default model('User',usersSchema)