import { Request, Response } from 'express';
import { User, IUser } from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Handles user signup.
 * 
 * Request Body:
 * {
 *     username: string; // Username of the new user
 *     email: string;    // Email of the new user
 *     password: string; // Password of the new user
 * }
 * 
 * Response Body:
 * {
 *     _id: string;           // Unique ID of the newly created user
 *     name: string;          // Username of the newly created user
 *     email: string;         // Email of the newly created user
 *     createdAt: Date;       // Timestamp of when the user was created
 *     __v: number;           // Version key from MongoDB
 * }
 * 
 * Response Status Codes:
 * 201 - Successful creation of a new user
 * 400 - User already registered with the provided email
 * 500 - Internal server error
 */
const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound) {
            res.status(400).json({ message: "User already registered, use a different email or log in to your account" });
            return;
        }

        const newUser = new User({
            name: username,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
            __v: newUser.__v
        });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

/**
 * Handles user signin.
 * 
 * Request Body:
 * {
 *     email: string;    // Email of the user trying to sign in
 *     password: string; // Password of the user trying to sign in
 * }
 * 
 * Response Body:
 * {
 *     userWithoutPassword: {
 *         _id: string;     // Unique ID of the authenticated user
 *         name: string;    // Username of the authenticated user
 *         Email: string;   // Email of the authenticated user
 *         createdAt: Date; // Timestamp of when the authenticated user was created
 *         __v: number;     // Version key from MongoDB
 *     },
 *     token: string;        // JWT token for authenticated user's session
 * }
 * 
 * Response Status Codes:
 * 200 - Successful authentication and retrieval of user details and token
 * 400 - Missing email or password in the request body
 * 401 - Invalid credentials provided
 * 500 - Internal server error
 */
const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email required" });
            return;
        }

        if (!password) {
            res.status(400).json({ message: "Password required" });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user!.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        const token = jwt.sign({ userId: user!._id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRATION });

        const { _id, name, email: Email, createdAt, __v } = user as IUser;
        const userWithoutPassword = { _id, name, Email, createdAt, __v };

        res.status(200).json({ userWithoutPassword, token });

    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
}

export { signup, signin };
