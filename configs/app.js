'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'
import userRouthes from '../src/users/users.routes.js'
import authRouthes from '../src/auth/auth.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import commentRoutes from '../src/comments/comments.routes.js'
import opinionRouthes from '../src/opinion/opinion.routes.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

 const routes = (app)=>{
    app.use('/v1/user',userRouthes)
    app.use('/v1',authRouthes)
    app.use('/v1/category',categoryRoutes)
    app.use('/v1/comment',commentRoutes)
    app.use('/v1/opinion',opinionRouthes)
}
export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}