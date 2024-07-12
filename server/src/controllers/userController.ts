

import {Request,Response} from  'express';
import {User} from '../model/User.js';
import jwt, { JwtPayload as DefaultJwtPayload }from 'jsonwebtoken';


interface JwtPayload extends DefaultJwtPayload {
    userId: string;
}

const getUserDetails = async (req:Request, res:Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
        const userId= decoded.userId;  

        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({messsage: "user not found"});
            return ;
        }

        res.json(user);

    }
    catch(error){
        res.status(401).json({message: "Invalid or expired token"});
    }
}

export {getUserDetails};