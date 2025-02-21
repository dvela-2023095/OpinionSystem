'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'
import userRouthes from '../src/users/users.routes.js'
import authRouthes from '../src/auth/auth.routes.js'
import adminRouthes from '../src/admin/admin.routes.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

 const routes = (app)=>{
    app.use('/v1/user',userRouthes)
    app.use(authRouthes)
    app.use('/v1/admin',adminRouthes)
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