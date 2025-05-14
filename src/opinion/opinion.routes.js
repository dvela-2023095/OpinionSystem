import { Router } from "express"
import {createOpinion,deleteOpinion,getCommentsFromOpinion,updateOpinion} from './opinion.controller.js'
import {opinionValidator, updatedOpinionValidator} from '../../middlewares/validations.js'
import { validateJwt,isUser, isMyOpinion } from "../../middlewares/validateJwt.js"
import { limiter } from "../../middlewares/rate.limit.js"
const api = Router()
api.post('/create/opinion',[validateJwt,opinionValidator],createOpinion)//lista
api.put('/update/opinion/:id',[validateJwt,isMyOpinion,updatedOpinionValidator],updateOpinion)//lista
api.delete('/delete/opinion/:id',[validateJwt,isMyOpinion],deleteOpinion)//lista
api.get('/find/:id',[limiter],getCommentsFromOpinion)
export default api