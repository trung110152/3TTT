declare class UserService {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<"Username is not existed" | "Password is wrong" | {
        username: any;
        idUser: any;
        role: any;
        status: any;
        token: any;
    }>;
    save: (user: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    update: (id: any, newUser: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
