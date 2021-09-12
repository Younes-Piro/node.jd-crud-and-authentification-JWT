import Post from '../models/post.js';

export const add = async (data,callback) => {
    const post = new Post({
        title : data.title,
        description : data.description
    });
    try{    
        const savedPost = await post.save();
        callback(null,savedPost);
    }catch(err){
        callback(err);
    }  
};

export const getAll = async (callback) => {
    try{
        const posts = await Post.find();
        callback(null,posts);
    }catch(err){
        callback(err);
    }  
};

export const findOne = async (data,callback) => {
    try{    
        const post = await Post.findById(data);
        console.log(post);
        callback(null,post);
    }catch(err){
        callback(err);
    }  
};

export const remove = async (data,callback) => {
    try{    
        const removedPost = await Post.remove({_id: data});
        callback(null,removedPost);
    }catch(err){
        callback(err);
    }  
};

export const update = async (data,callback) => {
    try{    
        const updatedPost = await Post.updateOne({_id: data.id},
            { $set:{title : data.title,description : data.description}});
        callback(null,updatedPost);
    }catch(err){
        callback(err);
    }  
};



