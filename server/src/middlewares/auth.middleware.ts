import jwt from 'jsonwebtoken';

const auth = async (req: any, res: any, next: any) => {
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
        req.user = verified.id;
        req.token = token;
        next();
    } catch (error:any) {
        res.status(500).json({ message : error.message });
    }
}

export default auth;
