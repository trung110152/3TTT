import {Request, Response} from "express";
import blogService from "../service/BlogService";
import categoryService from "../service/CategoryService";
class HomeController {
    private blogService;
    private categoryService;

    constructor() {
        this.blogService = blogService;
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let blogs = await blogService.getAll();
            res.status(200).json(blogs)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    getMyList = async (req: Request, res: Response) => {
        try{
            let id = req.params.id
            let blogs = await blogService.getMyList(id);
            res.status(200).json(blogs)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    findById = async (req: Request, res: Response) => {
        try{
            let id = req.params.id
            let blog = await this.blogService.findById(id);
            res.status(200).json(blog)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    create = async (req: Request, res: Response) => {
        let newBlog = await blogService.save(req.body);
        res.status(200).json(newBlog);
    }

    saveBlogCategory = async (req: Request, res: Response) => {
        let blogCategory = await categoryService.save(req.body);
        res.status(200).json(blogCategory);
    }

    update = async (req: Request, res: Response) => {
        let id = req.params.id;
        let newBlog = req.body;
        await this.blogService.update(id, newBlog);
        res.status(200).json('Success!')
    }


    remove = async (req: Request, res: Response) => {
        let id = req.params.id;
        await this.blogService.remove(id);
        res.status(200).json('Success!')

    }
    search = async (req: Request, res: Response) => {
        let search = req.query.name;
        // console.log(search)
        let blogs = await blogService.findByName(search);
        // console.log(blogs)
        res.status(200).json(blogs)
    }




    getCategories = async (req: Request, res: Response) => {
        try{
            let categories = await categoryService.getAll();
            // console.log(categories)
            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new HomeController();