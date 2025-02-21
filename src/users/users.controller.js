import User from "./users.model.js";
import Opinion from "../opinion/opinion.model.js";
import Comment from "../comments/comments.model.js"
import { checkPassword, encrypt } from "../../utils/encrypt.js";
//Crear una opinion
export const createOpinion = async(req,res)=>{
    try {
        let data = req.body
        let opinion = new Opinion(data)
        opinion.author = req.user.uid
        if(!opinion.author)return res.status(400).send({success:false,message:'Author of the comment not found'})
        opinion.save()
        return res.send({success:true,message:'Opinion successfully added'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error adding the opinion'})
    }
}

//Editar y eliminar solo opinion propia
export const updateOpinion = async(req,res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let oldOpinion = await Opinion.findByIdAndUpdate(id,
            {
                tittle:data.tittle,
                text:data.text
            },{new:true})
        if(!oldOpinion) return res.status(500).send({success:false,message:'Opinion not found'})
        return res.send({success:true,message:'Opinion updated'})    
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}

export const deleteOpinion = async(req,res)=>{
    try {
        let {id} = req.params
        let delOpinion = await Opinion.findByIdAndDelete(id)
        if(!delOpinion) return res.status(400).send({success:false,message:'Opinion not found'})
        Comment.deleteMany({opinion:delOpinion._id})
        return res.send({success:true,message:'Opinion deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}


//Comentar una opinion
export const comentOpinion = async(req,res)=>{
    try {
        let {id}=req.params
        let data = req.body
        let comment = new Comment(data)
        let opinion = await Opinion.findById(id)
        if(!opinion) return res.status(400).send({success:false,message:'Opinion not found'})
        comment.author=req.user.uid
        comment.save()
        opinion.comments.push(comment._id)
        opinion.save()
        return res.send({success:true,message:'Coment added succesfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}
//Editar Comentario
export const editComment =async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body
        let comment = await Comment.findByIdAndUpdate(id,{comment:data.comment},{new:true})
        if(!comment) return res.status(400).send({success:false,message:'Comment not found'})
        return res.send({succces:true,message:'Comment updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General error updating the comment'})
    }
}
//Eliminar Comentario
export const deleteComment = async (req,res) => {
    try {
        let {id} = req.params
        let comment = await Comment.findByIdAndDelete(id)
        if(!comment) return res.status(400).send({success:false,message:'Comment not found'})
        await Opinion.updateMany({comments:comment._id},{$pull:{comments: comment._id}})
        return res.send({success:true,message:'Comment deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the comment'})
    }
}
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
        let feed = await Opinion.find().skip(skip).limit(limit).populate({path:'author',select:'-_id name'}).populate({path:'category',select:'-_id name'}).populate({path:'comments',select:'-_id comment author',populate:{path:'author',select:'-_id name'}})
        if(feed.length===0)return res.status(400).send({success:false,message:'Opinions not found'})
        return res.send({success:true,message:'Opinions found:',feed})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error loading the feed'})
    }
}