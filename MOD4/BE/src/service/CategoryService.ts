
import {Category} from "../model/category";
import {AppDataSource} from "../data-source";
import {BlogCategory} from "../model/blog-category";

class CategoryService {
    private categoryRepository
    private blog_categoryRepository
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.blog_categoryRepository = AppDataSource.getRepository(BlogCategory)
    }

    getAll = async () => {
        // let sql ="select  c.name as nameCategory from blog_category bc join category c on bc.idCategory = c.id";
        let categories = await this.categoryRepository.find();
        return categories;
    }


    save = async (blogCategory) => {// blog ko id
        // console.log(blogCategory)
        return  this.blog_categoryRepository.save(blogCategory);
    }


}

export default new CategoryService();