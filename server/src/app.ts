
/**
 * package imports
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

/**
 * Database Connection import
 */
import connectDB from './config/database.js';


/**
 * Route Imports
 */
import userRoutes from './routes/userRoutes.js';
import postRoutes  from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import logRequests from './middleware/logs.js';



/**
 * configuring the environment variables
 */
dotenv.config();



const app = express();
const PORT  = process.env.PORT || 5000;


/**
 * configuring middlewares 
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logRequests);

/**
 * Connecting to the database
 */
connectDB();



/**
 * api Routes
 */
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);



app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
})

