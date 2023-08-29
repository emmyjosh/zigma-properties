import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import connectDB from './db/db';
import { engine } from 'express-handlebars';
import router from './routes';
//inits
const APP = express(); // express
dotenv.config({ path: "./config/config.env" }); // dotenv.config
// connectDB( ) //connectDB config



//consts
const PORT = process.env.PORT || 3000; //port


//MiddleWare
APP.use(express.urlencoded({ extended: true })); // express urlencoded
APP.use(morgan('combined')); // combine - morgan
APP.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
APP.set('view engine', '.hbs');



//Routes
APP.use('/', router);



APP.listen(PORT, () => {
    console.log(`
    app is running at : ${PORT} 
`);
}); //start server