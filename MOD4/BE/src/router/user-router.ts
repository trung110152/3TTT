import {Router} from "express";
import userController from "../controller/UserController";
import {auth} from "../../middleware/auth";
import {blogRouter} from "./blog-router";

export const userRouter = Router();
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
blogRouter.use(auth)
userRouter.get('/', userController.getAll);
userRouter.put('/lock/:id', userController.lock);