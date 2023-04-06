var jwt = require('jsonwebtoken');

const JWT_SECRET = "krishnaiseverything"


const fetchUser = (req, res, next)=>{
    const token = req.header("auth-token")

    if(!token){
        res.status(401).send({error:"Token not found"})
    }
try {
    const data = jwt.verify(token, JWT_SECRET)

    req.user = data.user

    next()
} catch (error) {
    res.status(401).send({error:"Please provide valid token"})

}
    
}


module.exports = fetchUser;