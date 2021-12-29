const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try{
        if( (req.cookies.token && jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY)) ||
            (req.headers.token && jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY)) ){
            req.authenticated = true;
        }
        else{
            res.clearCookie("token");
            req.authenticated = false;
        }
    } catch(err){
        res.clearCookie("token");
        req.authenticated = false;
    }
    next();
}


module.exports = { verifyToken };
