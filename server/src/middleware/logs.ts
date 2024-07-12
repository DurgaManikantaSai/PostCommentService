import { Request, Response, NextFunction } from 'express';

const logRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    // Store original send method
    const originalSend = res.send;

    // Replace send method with a custom function
    res.send = function (body?: any) {
        console.log('Response:', body);
        // Call the original send method with the correct context and arguments
        return originalSend.call(this, body);
    };
    
    next();
}

export default logRequests;