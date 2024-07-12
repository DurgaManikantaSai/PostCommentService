import express, { Router } from 'express';
import { createComment, getComments } from '../controllers/commentController.js';
import verifyToken from '../middleware/jwtVerification.js';


const router: Router = express.Router();

/**
 * This routes handles get request to api/comments/ by invoking getComments controller 
 */
router.get('/:postId',getComments);

/**
 * This route handles post request to api/comments/ by invoking createComments controller;
 */
router.post('/',verifyToken ,createComment);



export default router;
