const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try{
        const {username, password } = req.body;
        if(!username || !password){
            return res.status(401).json("missing username/password");
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        if(username.toLowerCase() !== process.env.ADMIN_USER || !bcrypt.compareSync(password, process.env.ADMIN_PASS)){
            return res.status(403).json("Unauthorized.");
        }   
        return res.status(200).json(jwt.sign({user: username, exp: Math.floor(Date.now() / 1000) + (40 * 60)}, process.env.JWT_SECRET_KEY));
    } catch(err){
        return res.status(400).json("An error occured.");
    }
}

module.exports = { login }
