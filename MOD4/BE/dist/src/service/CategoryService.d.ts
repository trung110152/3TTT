declare class CategoryService {
    private categoryRepository;
    private blog_categoryRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (blogCategory: any) => Promise<any>;
}
declare const _default: CategoryService;
export default _default;
