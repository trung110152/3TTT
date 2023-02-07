import {Blog} from "../model/blog";
import {AppDataSource} from "../data-source";

class BlogService {
    private blogRepository
    constructor() {
        this.blogRepository = AppDataSource.getRepository(Blog)
    }

    getAll = async () => {

        let sql ='select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id';
        let blogs = await this.blogRepository.query(sql);
        // console.log(products)
        return blogs;
    }
    getMyList = async (id) =>{
        let sql =`select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id where b.user = ${id} `;
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    save = async (blog) => {// blog ko id
        // console.log(blog)
        return  this.blogRepository.save(blog);
    }

    update = async (id, newBlog)=>{
        let blog = await this.blogRepository.findOneBy({id:id});
        if(!blog){
            return null;
        }
        return this.blogRepository.update({id: id}, newBlog);
    }

    findById = async (id)=> {
        let blog = await this.blogRepository.findOneBy({id:id});
        if(!blog){
            return null;
        }
        return blog;
    }

    findByName = async (search)=> {
        // console.log(search)

        let sql =`select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id where u.username like '%${search}%'`
        let blog = await this.blogRepository.query(sql);
        // console.log(blog)
        if(!blog){
            return null;
        }
        return blog;
    }


    remove = async (id)=> {
        let blog = await this.blogRepository.findOneBy({id:id});
        if(!blog){
            return null;
        }
        return  this.blogRepository.delete({id: id});
    }
}

export default new BlogService();