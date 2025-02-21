import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import {existUsername,existEmail, existCategory, alreadyCategory} from "../utils/db.validators.js"

export const userValidator = [
    body('name','Name cannot be empty').notEmpty().isLength({max:25}),
    body('surname','Surname cannot be empty').notEmpty().isLength({max:25}),
    body('username','Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('email','Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be Strong').isLength({min:8, max:100}).withMessage('Password must be at least 8 characters long'),
    validateErrors
]
export const updatedUserValidator = [
    body('name','Name cannot be empty').optional().notEmpty().isLength({max:25}),
    body('surname','Surname cannot be empty').optional().notEmpty().isLength({max:25}),
    body('username','Username cannot be empty').optional().notEmpty().toLowerCase().custom(existUsername),
    body('email','Email cannot be empty').optional().notEmpty().isEmail().custom(existEmail),
    validateErrors
]
export const opinionValidator = [
    body('tittle','Tittle cannot be empty').notEmpty().isLength({max:50}),
    body('category','Category cannot be empty').notEmpty().custom(existCategory),
    body('text','Text cannot be empty').notEmpty().isLength({max:1000}),
    validateErrors
]
export const updatedOpinionValidator = [
    body('tittle','Tittle cannot be empty').optional().notEmpty().isLength({max:50}),
    body('text','Text cannot be empty').optional().notEmpty().isLength({max:1000}),
    validateErrors
]
export const commentValidator = [
    body('comment','Comment cannot be empty').notEmpty().isLength({max:500}),
    validateErrors
]
export const updatedCommentValidator = [
    body('comment','Comment cannot be empty').optional().notEmpty().isLength({max:500}),
    validateErrors
]
export const categoryValidator = [
    body('name','Name cannot be empty').notEmpty().isLength({max:35}).custom(alreadyCategory),
    validateErrors
]
export const updatedCategoryValidator = [
    body('name','Name cannot be empty').optional().notEmpty().isLength({max:35}).custom(alreadyCategory),
    validateErrors
]