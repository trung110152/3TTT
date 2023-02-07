
import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async (user) =>{
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        if (!userCheck) {
            user.password = await bcrypt.hash(user.password,10);
            return this.userRepository.save(user);
        }
        return 'Username registered';
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }

    checkUser = async (user)=> {
        let userCheck = await this.userRepository.findOneBy({username : user.username} );
        if (!userCheck || userCheck.status === "unlock"){
            return 'Username is not existed';
        }
        let comparePassword = await bcrypt.compare(user.password, userCheck.password);
        if(!comparePassword){
            return 'Password is wrong';
        } else {
            let payload = {
                username: userCheck.username,
                idUser: userCheck.id,
                role: userCheck.role,
                status: userCheck.status
            }
            let secret = '123456';
            let check ={
                username: userCheck.username,
                idUser: userCheck.id,
                role: userCheck.role,
                status: userCheck.status,
                token: await jwt.sign(payload, secret, {
                    expiresIn: 360000
                })
            }
            return check

        }
    }

    save = async (user) => {
        return  this.userRepository.save(user);
    }


    findById = async (id)=> {
        let user = await this.userRepository.findOneBy({id:id});
        if(!user){
            return null;
        }
        return user;
    }

    update = async (id, newUser)=> {
        return await this.userRepository.update({id: id}, newUser);
    }
}

export default new UserService();