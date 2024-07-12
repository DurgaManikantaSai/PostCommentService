
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.body.userId = decoded.userId; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;
