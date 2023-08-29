import { Router } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/model/user.model';
import auth from '../../middlewares/auth.middleware';

const authRouter = Router();
const SALT : number = 8

authRouter.post('/signup', async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        const existingEmail = await User.findOne({ email: email });
        const exitingUsername = await User.findOne({ username: username });

        if (existingEmail) {
            res.status(400).json({ message: "Email already exists." });
        }
        if (exitingUsername) {
            res.status(400).json({ message: "Username already exists." });
        }
        
        const hashedPassword = await hashSync(password, SALT);

        let user = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        user = await user.save();
        res.status(201).json(user);
    } catch (error:any) {
    res.status(500).json({ message : error.message });
    }
});

authRouter.post('/login', async (req: any, res: any) => {

    try {
        const { username, email, password } = req.body;
        const user :any = await User.findOne({ email: email , username: username });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await compareSync(password, user.password);

        if (!isMatch) { 
            res.status(401).json({ message: "Invalid Password." });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY!);

        res.json({ token: token, ...user._doc });

    } catch (error:any) {
        res.status(500).json({ message : error.message });
    }
});


authRouter.post("/token-is-valid", async (req: any, res: any) => {
    try {
        const token = req.header(process.env.HEADER_SECRET!);
        if (!token) {
            res.status(401).json({ message: false });
        }
        const verified: any = jwt.verify(token, process.env.SECRET_KEY!);
        if (!verified) return res.status(401).json({ message: false });
        
        const user: any = await User.findById(verified.id);

        if (!user) return res.status(401).json({ message: false });
        return res.status(200).json({ message: true });
        
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.get("/", auth, async (req: any, res: any) => {
    const user: any = await User.findById(req.user);
    res.status(200).json({ ...user._doc, token: req.token });
});


export default authRouter;
