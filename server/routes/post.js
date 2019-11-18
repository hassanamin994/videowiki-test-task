import express from 'express';
import PostController from '../controllers/post';
import { verifyToken } from '../utils/jwt';


const postRouter = express.Router();

postRouter.post( '/posts', verifyToken, PostController.create);
postRouter.post('/get-posts', PostController.getAll);

export default postRouter;