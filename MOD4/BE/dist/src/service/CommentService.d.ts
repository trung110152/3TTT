declare class CommentService {
    private commentRepository;
    constructor();
    findByIdBlog: (idBLog: any) => Promise<any>;
    save: (comment: any) => Promise<any>;
}
declare const _default: CommentService;
export default _default;
