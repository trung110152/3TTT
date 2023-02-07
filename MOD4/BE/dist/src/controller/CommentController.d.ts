import { Request, Response } from "express";
declare class CommentController {
    private commentService;
    constructor();
    showComment: (req: Request, res: Response) => Promise<void>;
    commentSave: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CommentController;
export default _default;
