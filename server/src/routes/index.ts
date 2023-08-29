import { Router } from "express";

const router = Router();


// @desc Login/Landing pages
// @route GET /,

router.get('/', (req, res) => {
    res.render('login');
});

// @desc Dashboard
// @route GET /,

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


export default router;