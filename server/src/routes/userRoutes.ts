import express, { Router } from 'express';
import { getUserDetails } from '../controllers/userController.js';

const router: Router = express.Router();


router.get('/',getUserDetails);


export default router;