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
        const expires = (Math.floor(Date.now() / 1000) + (40 * 60));
        const token = jwt.sign({user: username, exp: expires}, process.env.JWT_SECRET_KEY);
        res.cookie("token", token, { httpOnly: true, maxAge: 2400000});
        return res.status(200).json({ token });
    } catch(err){
        return res.status(400).json("An error occured.");
    }
}

const logout = async (req, res) => {
    try {
    res.clearCookie("token")
    return res.status(200).send("deleted");
} catch(err){
        return res.status(400);
    }
}

module.exports = { login, logout }

// verify token middleware - use for each req that looks for cookie token and verifies it
