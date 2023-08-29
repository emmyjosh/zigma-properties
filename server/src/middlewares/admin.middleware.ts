import jwt from 'jsonwebtoken';
import User from '../database/model/user.model';

const admin = async (req: any, res: any, next: any) => {
    try {
        const token : any = req.header(process.env.HEADER_KEY!);
        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
        const verified: any = jwt.verify(token, process.env.SECRET_KEY!);
        if (!verified) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        const user: any = await User.findById(verified.id);
        if (user.role == "viewer") { 
            return res.status(401).json({
                message: 'You are not an admin'
            });
        }
        req.user = verified.id;
        req.token = token;
        next();   
    } catch (error:any) {
        res.status(500).json({ message : error.message });
    }
}

export default admin;
