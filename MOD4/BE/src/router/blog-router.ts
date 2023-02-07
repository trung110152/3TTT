import {Router} from "express";
import homeController from "../controller/HomeController";
import {auth} from "../../middleware/auth";
import {checkRole} from "../../middleware/checkRole";
export const blogRouter = Router();
blogRouter.use(auth)
blogRouter.get('/', homeController.getAll);
blogRouter.post('/',checkRole, homeController.create);
blogRouter.put('/:id',checkRole, homeController.update);
blogRouter.delete('/:id', homeController.remove);//,checkRole
blogRouter.get('/findById/:id', homeController.findById);
blogRouter.get('/getCategories', homeController.getCategories);
blogRouter.get('/search/findByName', homeController.search);
blogRouter.post('/blogCategory',checkRole , homeController.saveBlogCategory);
blogRouter.get('/myList/:id', homeController.getMyList);
