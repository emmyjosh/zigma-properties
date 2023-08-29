import { Router } from "express";

const router = Router();


// @desc Login/Landing pages
// @route GET /,

router.get('/', (req, res) => {
    res.send('login');
});

// @desc Dashboard
// @route GET /,

router.get('/dashboard', (req, res) => {
    res.send('dashbaord');
});


export default router;