import User from "../src/users/users.model.js";
import Category from "../src/category/category.model.js";
import { encrypt } from "./encrypt.js";
export const alreadyExist=async () => {
    let admin = await User.findOne({
        name:'Pedro',
        surname:'Armas',
        username:'parmas',
        email:'parmas@gmail.com',
        role:'ADMIN',
    })
    let category = await Category.findOne({
        name:'Un poco de Todo'
    })
    if(!admin) crearAdmin()
    if(!category) crearCategoria()
}
export const crearAdmin=async() =>{
    let admin = new User({
        name:'Pedro',
        surname:'Armas',
        username:'parmas',
        email:'parmas@gmail.com',
        password: await encrypt('ParmasGoat123@'),
        role:'ADMIN',
        status:true
    })
    admin.save()
}
export const crearCategoria =async()=>{
    let category = new Category({
        name:'Un poco de Todo'
    })
    category.save()
}