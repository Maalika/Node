const jwt=require('jsonwebtoken');
module.exports.verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    // It is used to check authHeader
    // console.log('authHeader',authHeader);
    if(authHeader){
        const token=authHeader.split(' ')[1];
        // It is used to check token
        // console.log('token',token);
        jwt.verify(token,'secret',(error,user)=>{
            if(error) res.status(403).json("Invalid Token");
            req.user=user;
            next();
        });
    }
    else{
        return res.status(401).json("Token not verify");
    }
};