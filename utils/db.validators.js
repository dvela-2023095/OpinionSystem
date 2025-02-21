import User from "../src/users/users.model.js";
import Opinion from "../src/opinion/opinion.model.js";
import Category from "../src/category/category.model.js"

export const existUsername = async (username) => {
    let user = await User.findOne({username:username})
    if(user){
        console.error(`The username ${username} is already taken`)
        throw new Error(`The username ${username} is already taken`);
        
    }
}

export const existEmail = async(email)=> {
    let mail = await User.findOne({email:email})
    if (mail) {
        console.error(`The email ${email} is already taken`)
        throw new Error(`The email ${email} is already taken`)    
    }
}

export const existCategory = async (category) => {
    let cat = await Category.findById(category)
    if(!cat){
        console.error('Category does not exist')
        throw new Error('Category does not exist');
        
    }
}

export const alreadyCategory = async(category)=>{
    let cat = await Category.findOne({name:category})
    if(cat){
        console.error(`Category ${category} already exist`)
        throw new Error(`Category ${category} already exist`);
    }
}