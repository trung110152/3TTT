"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                return this.userRepository.save(user);
            }
            return 'Username registered';
        };
        this.getAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck || userCheck.status === "unlock") {
                return 'Username is not existed';
            }
            let comparePassword = await bcrypt_1.default.compare(user.password, userCheck.password);
            if (!comparePassword) {
                return 'Password is wrong';
            }
            else {
                let payload = {
                    username: userCheck.username,
                    idUser: userCheck.id,
                    role: userCheck.role,
                    status: userCheck.status
                };
                let secret = '123456';
                let check = {
                    username: userCheck.username,
                    idUser: userCheck.id,
                    role: userCheck.role,
                    status: userCheck.status,
                    token: await jsonwebtoken_1.default.sign(payload, secret, {
                        expiresIn: 360000
                    })
                };
                return check;
            }
        };
        this.save = async (user) => {
            return this.userRepository.save(user);
        };
        this.findById = async (id) => {
            let user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                return null;
            }
            return user;
        };
        this.update = async (id, newUser) => {
            return await this.userRepository.update({ id: id }, newUser);
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map