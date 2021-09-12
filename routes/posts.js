import express from 'express';
import {add,getAll,findOne,remove,update} from '../controllers/PostController.js';
import verify from '../middleware/auth.js';

const router = express.Router();
//getAll
router.get('/',verify,(req,res) => {
    getAll( (error,results) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ success: 0, data: "Bad request" });
      }
      return res.status(200).json(results);
    });
});

//create
router.post('/', (req,res)=>{
    const data = {
      title: req.body.title,
      description: req.body.description,
    };
    add(data,(error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ success: 0, data: "Bad request" });
      }
      return res.status(200).send({
        success: 1,
        data: results,
      });
    });
});

//getone
router.get('/:id',(req,res) => {
  const data = req.params.id;

  findOne(data,(error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).json(results);
  });
});

//delete
router.delete('/:id',(req,res) => {
  const data = req.params.id;

  remove(data,(error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).json(results);
  });
});

//edit
router.patch('/:id',(req,res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    id:req.params.id
  };
  update(data,(error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).json(results);
  });
});

export {router as postsRoute};