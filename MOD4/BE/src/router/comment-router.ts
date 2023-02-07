import {Router} from "express";
import commentController from "../controller/CommentController";

export const commentRouter = Router();
commentRouter.get('/showComment/:id', commentController.showComment);
commentRouter.post('/commentSave', commentController.commentSave)