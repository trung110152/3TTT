declare class BlogService {
    private blogRepository;
    constructor();
    getAll: () => Promise<any>;
    getMyList: (id: any) => Promise<any>;
    save: (blog: any) => Promise<any>;
    update: (id: any, newBlog: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    findByName: (search: any) => Promise<any>;
    remove: (id: any) => Promise<any>;
}
declare const _default: BlogService;
export default _default;
