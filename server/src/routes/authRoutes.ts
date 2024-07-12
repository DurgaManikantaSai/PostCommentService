
import express, { Router } from 'express';

const router: Router = express.Router();
import { signin, signup } from '../controllers/authController.js';




//use to sigin
router.post("/signin", signin);

//use to singup
router.post("/signup", signup);


export default router;