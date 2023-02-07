export const SECRET = '123456';
import jwt from "jsonwebtoken";

export const auth = (req, res, next) =>{
    let authorization = req.headers.authorization;
    // console.log(authorization);
    if(authorization){
        let accessToken = req.headers.authorization.split(' ')[1];
        // console.log(accessToken);
        if(accessToken){
            jwt.verify(accessToken, SECRET, (err, payload)=>{
                if(err){
                    res.status(401).json({
                        error: err.message,
                        message: 'You are anonymous'
                    })
                } else{
                    req.decode = payload;
                    next();
                }
            })
        } else {
            res.status(401).json({
                message: 'You are anonymous'
            })
        }
    } else {
        res.status(401).json({
            message: 'You ar anonymous'
        })
    }
}