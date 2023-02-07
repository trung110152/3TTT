declare class LikeService {
    private likeRepository;
    constructor();
    findByIdBlog: (idBLog: any) => Promise<any>;
    countLike: (idBLog: any) => Promise<any>;
    checkLike: (idBLog: any, idUser: any) => Promise<any>;
    save: (like: any) => Promise<any>;
    update: (id: any, status: any) => Promise<any>;
}
declare const _default: LikeService;
export default _default;
