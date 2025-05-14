import Comment from "./comments.model.js"
import Opinion from '../opinion/opinion.model.js'
//Comentar una opinion
export const comentOpinion = async(req,res)=>{
    try {
        let {id}=req.params
        let data = req.body
        let comment = new Comment(data)
        let opinion = await Opinion.findById(id)
        if(!opinion) return res.status(400).send({success:false,message:'Opinion not found'})
        await comment.save()
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