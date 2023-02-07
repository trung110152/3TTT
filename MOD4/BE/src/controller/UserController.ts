import {Request, Response} from "express";
import userService from "../service/UserService";


class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let users = await userService.getAll();
            res.status(200).json(users)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    login = async (req: Request, res: Response)=>{

        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response)
    }

    signup = async (req: Request, res: Response) => {
        let user = await this.userService.register(req.body);
        res.status(201).json(user);
    }

    lock = async (req: Request, res: Response) => {
        try{
            let id = req.params.id
            let user = await userService.findById(id);
            if (user.status === 'lock'){
                user.status = "unlock";
                await this.userService.update(id, user);
                res.status(200).json(user)
            } else {
                user.status = "lock";
                await this.userService.update(id, user);
                res.status(200).json(user)
            }

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


}

export default new UserController();