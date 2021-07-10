const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const JWT_SECRET = "2a$12$7JdHp7xUPmL1vCbx8XLKAMnnftZOQwBwvq6Xu9Nq"
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const tokenGenerate = (name, email, isAdmin) => {
    return jwt.sign({ name, email, isAdmin }, JWT_SECRET, { expiresIn: '1h' })
}



exports.signIn = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = []
            console.log(errors)
            errors.array({ onlyFirstError: true })
                .map(err => extractedErrors.push({ [err.param]: err.msg }));
                
            res.status(400).json({error:extractedErrors})
        }
        else {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {  
                    const token = tokenGenerate({ name: user.name, email: user.email, isAdmin: user.isAdmin });
                    res.json({
                        token
                    });
                }
                else {
                    const error = {email:'Wrong Password'}
                    res.status(401).json({error:[error]})
                }
            }
            else {    
                const error = {email:'Wrong Creditionals'}
                res.status(401).json({error:[error]}) 
            }
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
}


exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = []
            errors.array({ onlyFirstError: true })
                .map(err => extractedErrors.push({ [err.param]: err.msg }));
            return res.status(400).json({
                error: extractedErrors,
            });
        }
        else {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (user) {
                const error = {email:'User Existed',password:'',name:''}
                res.status(401).json({error:[error]})
            }
            else {
                const password = await bcrypt.hash(req.body.password, 12);
                const saveUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: password,
                    isAdmin:false
                })
                const newUser = await saveUser.save()
                
                if (newUser) {
                    const token = tokenGenerate({ name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin });
                    res.status(201).json({token})
                   
                }
                else {
                    const error = {email:'User is Not Created',password:'',name:''}
                    res.status(401).json({error:[error]})
                }
            }
        }

    }
    catch (err) {
        res.status(500).send("internal server error")
    }
}

exports.emailCheck = async(req,res)=>{
    try {
            const email = req.params.email;
            const user = await User.findOne({
                email: email,
            })
            if (user) {
                const token = tokenGenerate({ name: user.name, email: user.email, isAdmin: user.isAdmin });
                const emailData = {
                    from: 'rohit.ladhar@gmail.com',
                    to: email,
                    subject: 'Account activation link',
                    html: `
                              <h1>Please use the following to activate your account</h1>
                              <p>http://localhost:3000/forgetpassword/${token}</p>
                              <hr />
                              <p>This email may containe sensetive information</p>
                              <p>http://localhost:3000</p>
                          `
                  };
                  console.log(token)
                  sgMail
                    .send(emailData)
                    .then(sent => {
                       
                    return res.json({
                        message: `Email has been sent to ${email}`
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json({
                          error:err
                        });
                      });
                      
            }
            else {
                    res.status(401).json({error:'Email Is Not Registered'})
                }
            }
        
        catch (err) {
            res.status(500).send("internal server error")
        }
}

exports.forgetPassword = async (req,res)=>{
    try {
            const token = req.params.token;
            jwt.verify(token, JWT_SECRET, (err, decode) => {
                req.user = decode;
            })
            const user = await User.findOne({
                email: req.user.name.email ,
            })
            
        if (user) {
           
           user.password = await bcrypt.hash(req.body.password, 12);
            
            const userStatus = await user.save()
           
            if (userStatus) {
                 res.json({result:'Password Updated'})
            }
            else {
                 res.json({result:'Password Updation Fail'})
            }

        }
        else {
            res.json({ result: "Email Is Not Registered" })
        }

    }
    catch (err) {
        console.log(err)
    }
}
