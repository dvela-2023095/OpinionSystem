import { Router } from "express";
import { validateJwt,isUser } from "../../middlewares/validateJwt.js";
import {comentOpinion, deleteComment, editComment} from './comments.controller.js'
import {commentValidator, updatedCommentValidator} from '../../middlewares/validations.js'
import { isMyComment } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
const api = Router()

api.post('/coment/:id',[commentValidator,limiter],comentOpinion)//lista
api.put('/edit/comment/:id',[validateJwt,isUser,isMyComment,updatedCommentValidator],editComment)//listo
api.delete('/delete/comment/:id',[validateJwt,isUser,isMyComment],deleteComment)

export default api