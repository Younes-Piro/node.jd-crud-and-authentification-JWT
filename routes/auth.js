import express from 'express';
import {register, getAll} from '../controllers/UserController.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {registerValidation , loginValidation} from '../validation/schema-auth.js';
import verify from '../middleware/auth.js';

const router = express.Router();
//getAll user
router.get('/',verify,getAll);
//register
router.post('/register',async (req,res) => {

    //validation 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); //in case error return the message only

    //check if email exist 
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
    
    //Hash the passwd 
    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(req.body.password, salt);

    //register
    const data = {
        name : req.body.name,
        email : req.body.email,
        password : hashedPasswd
    };

    register(data, (error,result) => {
        if(error){
            console.log(error);
            return res.status(400).send({ success: 0, data: "Bad request" });
        }else{
            return res.status(200).send({
                success: 1,
                data: result
            });
        }
    });
});

//login 
router.post('/login',async (req,res) => {

    //validation 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); //in case error return the message only

    //check if email exist 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email doesn\'t exist');

    //password if correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    
    //Create and assign a token
    const token = jwt.sign({
        _id : user._id,
        email : user.email
    }, process.env.TOKEN_SECRET,{
        expiresIn: "1h"
    });
    res.header('auth-token', token).json({token: token});
});

export {router as authRoute};
