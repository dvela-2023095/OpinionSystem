import { Router } from "express"
import {createOpinion,deleteOpinion,updateOpinion} from './opinion.controller.js'
import {opinionValidator, updatedOpinionValidator} from '../../middlewares/validations.js'
import { validateJwt,isUser, isMyOpinion } from "../../middlewares/validateJwt.js"
const api = Router()
api.post('/create/opinion',[validateJwt,opinionValidator],createOpinion)//lista
api.put('/update/opinion/:id',[validateJwt,isMyOpinion,updatedOpinionValidator],updateOpinion)//lista
api.delete('/delete/opinion/:id',[validateJwt,isMyOpinion],deleteOpinion)//lista

export default api