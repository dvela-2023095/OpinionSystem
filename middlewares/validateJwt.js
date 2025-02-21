'use strict'
import  jwt  from "jsonwebtoken"
import Opinion from "../src/opinion/opinion.model.js"
import Comment from "../src/comments/comments.model.js"
import User from "../src/users/users.model.js"
export const validateJwt = async(req,res,next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unautorized'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        const {user} =req
        if(!user || user.role !== 'ADMIN') return res.status(403).send({success:false,message:`You dont have access| username ${user.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message: 'Error whit authorization'})
    }
}

export const isUser = async(req,res,next)=>{
    try {
        const {user}=req
        if(!user || user.role !== 'USER') return res.status(403).send({success:false,message:`You dont have access| username ${user.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message:'Error whit authorization'})
    }
}

export const isMyOpinion = async (req,res,next) => {
    try {
        let {id}= req.params
        let {uid}=req.user
        let opinion = await Opinion.findById(id)
        if(!opinion) return res.status(400).send({success:false,message:'Opinion not found'})
        if(opinion.author != uid) return res.status(403).send({success:false,message:'This is not your opinion'})
        next()
    } catch (error) {
        console.error(error)
        return res.send(401).send({success:false,message:'Error verificating'})
    }
}

export const isMyComment = async(req,res,next)=>{
    try {
        let {id}=req.params
        let comment = await Comment.findById(id)
        if(!comment) return res.status(400).send({success:false,message:'Comment not found'})
        if(comment.author.toString() !== req.user.uid) return res.send({successs:false,message:'This is not your comment'})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message:'Error verificating'})
    }
}