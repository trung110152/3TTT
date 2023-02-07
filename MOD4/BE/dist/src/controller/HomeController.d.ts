import { Request, Response } from "express";
declare class HomeController {
    private blogService;
    private categoryService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    getMyList: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    saveBlogCategory: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    search: (req: Request, res: Response) => Promise<void>;
    getCategories: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
