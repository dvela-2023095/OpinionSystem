import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { addCategory, deleteCategory, findCategory, listCategories, updateCategory } from "./admin.controller.js";
import { categoryValidator, updatedCategoryValidator } from "../../middlewares/validations.js";

const api = Router()
api.post('/add',[validateJwt,isAdmin,categoryValidator],addCategory)
api.delete('/delete/:id',[validateJwt,isAdmin],deleteCategory)
api.get('/',[validateJwt,isAdmin],listCategories)
api.get('/get/:id',[validateJwt,isAdmin],findCategory)
api.put('/update/:id',[validateJwt,isAdmin,updatedCategoryValidator],updateCategory)
export default api