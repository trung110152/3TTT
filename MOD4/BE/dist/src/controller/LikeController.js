"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeService_1 = __importDefault(require("../service/LikeService"));
class LikeController {
    constructor() {
        this.countLike = async (req, res) => {
            let likes = await LikeService_1.default.countLike(req.params.idBlog);
            res.status(200).json(likes);
        };
        this.checkLike = async (req, res) => {
            let like = req.body;
            let likes = await this.likeService.checkLike(like.blog, like.user);
            if (likes === null) {
                like.status = 'like';
                await this.likeService.save(like);
                res.status(200).json('done');
            }
            else if (likes[0].status === 'dislike') {
                likes[0].status = 'like';
                await this.likeService.update(likes[0].id, likes[0].status);
                res.status(200).json('done');
            }
            else {
                likes[0].status = 'dislike';
                await this.likeService.update(likes[0].id, likes[0].status);
                res.status(200).json('done');
            }
        };
        this.likeService = LikeService_1.default;
    }
}
exports.default = new LikeController();
//# sourceMappingURL=LikeController.js.map