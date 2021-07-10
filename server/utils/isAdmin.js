const User = require('../models/users')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "2a$12$7JdHp7xUPmL1vCbx8XLKAMnnftZOQwBwvq6Xu9Nq"
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.split('Bearer ')[1];
        jwt.verify(onlyToken, JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ errors: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ errors: "Token is not supplied" })
    }
}

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.split('Bearer ')[1];
        jwt.verify(onlyToken, JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ errors: 'Invalid Token' });

            }
            req.user = decode;
            if (req.user.name.isAdmin === true) {
                next();
                return;
            }
            else {
                return res.status(401).send({ errors: 'Admin Token is not Valid.' })
            }

        });
    }
    else {
        return res.status(401).send({ msg: 'Admin Token is not Valid.' })
    }
}

const isValid =  (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.split('Bearer ')[1];
        jwt.verify(onlyToken, JWT_SECRET, (err, decode) => {
            if (err) {
                return res.json({ result: 'Invalid Token' });
            }
            else{
                req.user = decode;
                const email = req.user.name.email 
                const validUser = User.findOne({
                    email: email
                })
                if(validUser){
                    next();
                    return;
                }
                else{
                    return res.json({ result: "Token is expired" })
                }
                
            }
           
        });
    } else {
        return res.json({ result: "Token is not supplied" })
    }
}

module.exports = { isAdmin, isAuth, isValid }