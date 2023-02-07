import { Request, Response } from "express";
declare class UserController {
    private userService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    lock: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
