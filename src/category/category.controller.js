import Category from "../category/category.model.js";
import Opinion from "../opinion/opinion.model.js";
export const addCategory = async (req,res) => {
    try {
        let data = req.body
        let category = new Category(data)
        category.save()
        return res.send({success:true,message:'Category addedd successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({succcess:false,message:'General error adding the Category'})
    }
}
export const listCategories=async(req,res)=>{
    try {
        const {limit=20,skip=0} = req.query
        let categories = await Category.find().skip(skip).limit(limit)
        if(categories.length ===0) return res.status(400).send({success:false,message:'Categories not found'})
        return res.send({success:true,message:'Categories found: ',categories})
    } catch (error) {
        console.error(error)
        return res.status(500).send({succcess:false,message:'General error listing the Category'})
    }
}
export const findCategory=async(req,res)=>{
    try {
        let {id}=req.params
        let category = await Category.findById(id)
        if(!category) return res.status(400).send({succcess:false,message:'Category not found'})
        return res.send({success:true,message:'Category found: ',category})
    } catch (error) {
        console.error(error)
        return res.status(500).send({succcess:false,message:'General error searching the Category'})
    }
}
export const updateCategory =async(req,res)=>{
    try {
        let {id}=req.params
        let data = req.body
        let category = await Category.findByIdAndUpdate(id,data,{new:true})
        if(!category)return res.status(400).send({success:false,message:'Category not found'})
        return res.send({success:true,message:'Category updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({succcess:false,message:'General error updating the Category'})
    }
}

export const deleteCategory = async(req,res)=>{
    try {
        let {id}=req.params
        let category = await Category.findById(id)
        if(!category) return res.status(400).send({success:false,message:'Category not found'})
        if(category.name === 'Un poco de Todo') return res.send({success:false,message:`Can't delete a default category`})
        await Category.findByIdAndDelete(id)
        let def = await Category.findOne({name:'Un poco de Todo'})
        await Opinion.updateMany({category:category._id},{category:def._id})
        return res.send({success:true,message:'Category deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({succcess:false,message:'General error deleting the Category'})
    }
}