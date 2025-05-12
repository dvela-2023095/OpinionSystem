import { Router } from "express";
import { changePassword,     deleteProfile,  editProfile, loadFeed, } from "./users.controller.js";
import {     updatedUserValidator } from "../../middlewares/validations.js";
import {   isUser, validateJwt } from "../../middlewares/validateJwt.js";


const api = Router()
//Opiniones

//Comentarios

//Eliminar y editar perfil
api.delete('/delete/profile',[validateJwt,isUser],deleteProfile)//lista
api.put('/edit/profile',[validateJwt,isUser,updatedUserValidator],editProfile)//lista
api.put('/change/password',[validateJwt],changePassword)//lista

//mostar todas las publicaciones existentes
api.get('/feed',[validateJwt],loadFeed)//lista
export default api