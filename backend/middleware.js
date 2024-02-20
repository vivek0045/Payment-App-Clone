const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            message : "Invalid auth token"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(decode.userId){
            req.userId = decode.userId;
        }else{
            return res.status(403).json({});
        }
        

        next();
    } catch (err) {
        return res.status(403).json({});
    }

}