import jwt from 'jsonwebtoken';
import auth from '../Models/authModel.js';
import auction from '../Models/authModels.js';

const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).send('Invailed not found')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invaild Token')
        
    }

}

export default authMiddleware;