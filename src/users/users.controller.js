import User from "./users.model.js";
import Opinion from "../opinion/opinion.model.js";

import { checkPassword, encrypt } from "../../utils/encrypt.js";




//Edit profile
export const editProfile = async(req,res)=>{
    try {
        let data = req.body
        let profile = await User.findByIdAndUpdate(req.user.uid,
            {
                name:data.name,
                surname:data.surname,
                username:data.username,
                email: data.email,
            })
        if(!profile) return res.status(400).send({success:false,message:'Profile not found'})
        return res.send({success:true,message:'Profile updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}

//Cambiar contrasena
export const changePassword = async(req,res)=>{
    try {
        let {oldPassword,newPassword}= req.body
        let user = await User.findById(req.user.uid)
        if(!oldPassword || !newPassword) return res.send({success:false,message:'You must send the old and new password'})
        if(user && await checkPassword(user.password,oldPassword)){
            user.password = await encrypt(newPassword)
            user.save()
            return res.send({success:true,message:'Password changed'})
        }
        return res.send({success:false,message:'Wrong password'})
    } catch (error) {
        console.log(error)
        return res.status(500).sendd({success:false,message:'General error changing the password'})
    }
}
//Delete profile
export const deleteProfile = async(req,res)=>{
    try {
        let {password}=req.body
        let user = await User.findById(req.user.uid)
        if(!user || !password) return res.status(400).send({success:false,message:'User not found or password was not send'})
        if(await checkPassword(user.password,password)){
            user.status = false
            user.save()
            return res.send({success:true,message:'Profile deleted'})
        }
        return res.send({success:false,message:'Wrong password'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}
//Feed
export const loadFeed = async (req,res) => {
    try {
        const {limit=20,skip=0} = req.query
        let feed = await Opinion.find().skip(skip).limit(limit).populate({path:'category',select:'-_id name'}).populate({path:'comments',select:'-_id comment author createdAt'})
        if(feed.length===0)return res.status(400).send({success:false,message:'Opinions not found'})
        return res.send({success:true,message:'Opinions found:',feed})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error loading the feed'})
    }
}