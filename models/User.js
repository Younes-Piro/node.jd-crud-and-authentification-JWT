import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create post schema
const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true,
        max:1024,
        min:6
    },  
    date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User',userSchema);

export default User;