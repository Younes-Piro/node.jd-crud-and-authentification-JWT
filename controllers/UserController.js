import User from '../models/User.js';

export const register = async (data,callback) => {
    const user = new User({
        name : data.name,
        email : data.email,
        password : data.password
    });
    try{    
        const savedUser = await user.save();
        callback(null,{user : user._id});
    }catch(err){
        callback(err);
    }
};

export const getAll = async (req,res) => {
    try{
        const Users = await User.find();
        res.status(200).json(Users);
    }catch(err){
        res.status(400).send(err);
    }
};

