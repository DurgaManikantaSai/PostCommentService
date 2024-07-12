import express, { Router } from 'express';

import { createPost, getPosts , getPostById } from '../controllers/postController.js';
import verifyToken from '../middleware/jwtVerification.js';

const router: Router = express.Router();


router.post('/',verifyToken,createPost);
router.get('/',getPosts);
router.get('/:postId',verifyToken, getPostById);

export default router;