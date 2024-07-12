
import { Request, Response } from "express";
import { Comment, IComment } from "../model/Comment.js";
import mongoose from "mongoose";

/**
 * Creates a new comment.
 * 
 * @param req - The request object containing the comment data in the request body.
 * Request Body:
 * {
 *   content: string; // The content of the comment
 *   userId: string;  // The ID of the user creating the comment
 *   postId: string;  // The ID of the post the comment belongs to
 * }
 * 
 * @param res - The response object used to send back the status and JSON data.
 * Response Body on Success:
 * {
 *   _id: string;       // The ID of the newly created comment
 *   content: string;   // The content of the comment
 *   userId: string;    // The ID of the user who created the comment
 *   postId: string;    // The ID of the post the comment belongs to
 *   createdAt: string; // The timestamp when the comment was created
 * }
 * 
 * Response Status Codes:
 * 201 - Successful creation of a new comment
 * 400 - Invalid content or postId format
 * 500 - Internal server error
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content, userId, postId } = req.body;

        // Backend validation
        if (content.trim().length === 0) {
            throw new Error("Content should not be empty");
        }

        if (postId.trim().length === 0 || !mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error("Invalid postId");
        }

        const newComment: IComment = new Comment({
            content,
            userId,
            postId
        });

        await newComment.save();
        res.status(201).json({
            _id: newComment._id,
            content: newComment.content,
            userId: newComment.userId,
            postId: newComment.postId,
            createdAt: newComment.createdAt.toISOString()
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

/**
 * Retrieves comments for a specific post.
 * 
 * @param req - The request object. Expects postId as a query parameter.
 * Request Parameters:
 * {
 *   postId: string; // The ID of the post for which comments are to be retrieved
 * }
 * 
 * @param res - The response object used to send back the status and JSON data.
 * Response Body on Success:
 * [
 *   {
 *     _id: string;       // The ID of the comment
 *     content: string;   // The content of the comment
 *     userId: string;    // The ID of the user who created the comment
 *     postId: string;    // The ID of the post the comment belongs to
 *     createdAt: string; // The timestamp when the comment was created
 *   },
 *   ...
 * ]
 * 
 * Response Status Codes:
 * 200 - Successful retrieval of comments
 * 400 - Invalid postId format
 * 500 - Internal server error
 * 
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const getComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({ message: 'Invalid postId format' });
            return;
        }

        const validPostId = new mongoose.Types.ObjectId(postId);
        const comments = await Comment.find({ postId: validPostId });

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
}

export { createComment, getComments };
