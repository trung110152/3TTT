export const checkRole = (req,res, next)=>{
    if(req.decode.role === 'member'){
        next()
    }else{
        res.status(403).json({
            message: 'You are anonymous kk'
        })
    }
}