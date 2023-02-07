import {Router} from "express";
import likeController from "../controller/LikeController";

export const likeRouter = Router();
likeRouter.get('/countLike/:idBlog', likeController.countLike);
likeRouter.put('/checkLike', likeController.checkLike)