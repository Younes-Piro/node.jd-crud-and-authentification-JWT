import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create post schema
const postSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    }, 
}, {timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;