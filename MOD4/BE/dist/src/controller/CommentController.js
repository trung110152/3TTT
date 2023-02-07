"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentService_1 = __importDefault(require("../service/CommentService"));
class CommentController {
    constructor() {
        this.showComment = async (req, res) => {
            try {
                let comments = await CommentService_1.default.findByIdBlog(req.params.id);
                res.status(200).json(comments);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.commentSave = async (req, res) => {
            let comment = await CommentService_1.default.save(req.body);
            res.status(200).json(comment);
        };
        this.commentService = CommentService_1.default;
    }
}
exports.default = new CommentController();
//# sourceMappingURL=CommentController.js.map