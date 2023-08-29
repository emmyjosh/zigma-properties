import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db';
import authRouter from './routes/auth/auth.router';
import morgan from 'morgan';

//Init dotenv module
dotenv.config({ path: './config/config.env' });// config.env environment

// init express module
const app = express(); // app = express
const port = process.env.PORT || 3000 ; // port = 3000

connectDB(); // Connect to database

//MiddleWares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/apiV1/', authRouter);


app.listen(port, () => {
    console.log(`
    Server running on port ${port}
    visit : http://localhost:8080
    `); // server running on port log it when true
}); // run server