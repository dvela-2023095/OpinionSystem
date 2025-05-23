import Opinion from './opinion.model.js'
import Comment from '../comments/comments.model.js'
//Crear una opinion
export const createOpinion = async(req,res)=>{
    try {
        let data = req.body
        let opinion = new Opinion(data)
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
        await Comment.deleteMany({opinion:delOpinion._id})
        return res.send({success:true,message:'Opinion deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:''})
    }
}

export const getCommentsFromOpinion = async(req,res)=>{
    try {
        let {id} = req.params
        let opinion = await Opinion.findById(id).populate({path:'comments',select:'-_id author comment createdAt'})
        if(!opinion) return res.status(400).send({success:false,message:'Opinion not found'})
        let comments = opinion.comments
        return res.send({success:true,message:'Comments found',comments})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General Error Getting the comments'})
    }
}