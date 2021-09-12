import express from 'express';
import mongoose from 'mongoose';
import {postsRoute} from './routes/posts.js';
import {authRoute} from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //data to json
app.use('/api/posts',postsRoute);
app.use('/api/user',authRoute);

//connect to mongoDb
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true , useUnifiedTopology: true})
.then( (result) => app.listen(3000 , () => console.log('salam salamona')))
.catch((err) => console.log(err));
