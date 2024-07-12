import { Post, IPost } from '../model/Post.js';
import { Request, Response } from 'express';

/**
 * Creates a new post.
 * 
 * @param req - The request object containing the post data in the request body.
 * Request Body:
 * {
 *   userId: string;  // The ID of the user creating the post
 *   title: string;   // The title of the post
 *   content: string; // The content of the post
 * }
 * 
 * @param res - The response object used to send back the status and JSON data.
 * Response Body on Success:
 * {
 *   _id: string;       // The ID of the newly created post
 *   title: string;     // The title of the post
 *   content: string;   // The content of the post
 *   author: string;    // The author of the post
 *   createdAt: string; // The creation timestamp of the post
 * }
 * 
 * Response Status Codes:
 * 201 - Successful creation of a new post
 * 400 - Invalid request body format or missing required fields
 * 500 - Internal server error
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, title, content } = req.body;
        const newPost = new Post({ title, content, userId });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

/**
 * Retrieves all posts sorted by creation date in descending order.
 * 
 * @param req - The request object. This function does not require any specific data in the request body.
 * 
 * @param res - The response object used to send back the status and JSON data.
 * Response Body on Success:
 * [
 *   {
 *     _id: string;       // The ID of the post
 *     title: string;     // The title of the post
 *     content: string;   // The content of the post
 *     author: string;    // The author of the post
 *     createdAt: string; // The creation timestamp of the post
 *   },
 *   ...
 * ]
 * 
 * Response Status Codes:
 * 200 - Successful retrieval of posts
 * 500 - Internal server error
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts: IPost[] = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


const getPostById = async(req: Request, res: Response): Promise<void> => {
    try{
        const postId = req.params.postId;
        const post = await Post.findOne({_id: postId});
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(post);
    }
    catch(error){
        res.status(500).json({message:(error as Error).message});
    }
}

export { getPosts, createPost , getPostById };
