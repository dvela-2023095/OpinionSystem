import { Router } from "express";
import { changePassword, comentOpinion, createOpinion, deleteComment, deleteOpinion, deleteProfile, editComment, editProfile, loadFeed, updateOpinion } from "./users.controller.js";
import { commentValidator, opinionValidator, updatedCommentValidator, updatedOpinionValidator, updatedUserValidator } from "../../middlewares/validations.js";
import { isMyComment, isMyOpinion, isUser, validateJwt } from "../../middlewares/validateJwt.js";


const api = Router()
//Opiniones
api.post('/create/opinion',[validateJwt,isUser,opinionValidator],createOpinion)//lista
api.put('/update/opinion/:id',[validateJwt,isUser,isMyOpinion,updatedOpinionValidator],updateOpinion)//lista
api.delete('/delete/opinion/:id',[validateJwt,isUser,isMyOpinion],deleteOpinion)//lista
//Comentarios
api.post('/coment/:id',[validateJwt,isUser,commentValidator],comentOpinion)//lista
api.put('/edit/comment/:id',[validateJwt,isUser,isMyComment,updatedCommentValidator],editComment)//listo
api.delete('/delete/comment/:id',[validateJwt,isUser,isMyComment],deleteComment)
//Eliminar y editar perfil
api.delete('/delete/profile',[validateJwt,isUser],deleteProfile)//lista
api.put('/edit/profile',[validateJwt,isUser,updatedUserValidator],editProfile)//lista
api.put('/change/password',[validateJwt,isUser],changePassword)//lista

//mostar todas las publicaciones existentes
api.get('/feed',[validateJwt,isUser],loadFeed)//lista
export default api