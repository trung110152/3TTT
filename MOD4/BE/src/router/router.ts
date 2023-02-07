import {Router} from "express";
import {blogRouter} from "./blog-router";
import {userRouter} from "./user-router";
import {commentRouter} from "./comment-router";
import {likeRouter} from "./like-router";


export const router = Router();
router.use('/blogs', blogRouter);
router.use('/auth', userRouter);
router.use('/comments', commentRouter)
router.use('/likes', likeRouter)