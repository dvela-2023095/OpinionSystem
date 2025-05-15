import User from "../src/users/users.model.js";
import Category from "../src/category/category.model.js";
import { encrypt } from "./encrypt.js";
import Opinion from "../src/opinion/opinion.model.js";
export const alreadyExist=async () => {
    let admin = await User.findOne({
        name:'Pedro',
        surname:'Armas',
        username:'parmas',
        email:'parmas@gmail.com',
        role:'ADMIN',
    })
    let category1 = await Category.findOne({
        name:'Tecnología'
    })
    let category2 = await Category.findOne({
        name:'Taller'
    })
    let categor3 = await Category.findOne({
        name:'Practica Supervisada'
    })
    if(!admin) crearAdmin()
    if(!category1) crearCategoria1()
    if(!category2) crearCategoria2()
    if(!categor3) crearCategoria3()
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
export const crearCategoria1 =async()=>{
    let category = new Category({
        name:'Tecnología'
    })
    await category.save()
    let opinion = new Opinion({
        tittle:'Mapa mental sobre React',
        category:category._id,
        text:'Realizar un mapa mental en canva en el cual se deben de tomar en cuenta todos los temas relacionados con react para que los estudiantes puedan entender como funciona la herramienta',
        comments:[]
    })
    await opinion.save()
}
export const crearCategoria2 =async()=>{
    let category = new Category({
        name:'Taller'
    })
    await category.save()
    let opinion = new Opinion({
        tittle:'Hacer Warzone desde 0',
        category:category._id,
        text:'Realizar el juego "Warzone" desde cero, con los mapas, modo historia, modo de zombies, pase de batalla, anticheat etc. animo',
        comments:[]
    })
    await opinion.save()
}
export const crearCategoria3 =async()=>{
    let category = new Category({
        name:'Practica Supervisada'
    })
    await category.save()
    
    let opinion = new Opinion({
        tittle:'Programar Un PC',
        category:category._id,
        text:'Hacer windows desde cero, programando cada elemento a partir de su mente, sin bugs con actualizaciones. Sacarlo a la venta y hacerse millonario',
        comments:[]
    })
    await opinion.save()
}