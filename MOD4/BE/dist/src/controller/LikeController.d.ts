import { Request, Response } from "express";
declare class LikeController {
    private likeService;
    constructor();
    countLike: (req: Request, res: Response) => Promise<void>;
    checkLike: (req: Request, res: Response) => Promise<void>;
}
declare const _default: LikeController;
export default _default;
