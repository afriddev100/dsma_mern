import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import connectDB from './config/db.js';
import  cors from 'cors';
import cookieParser from 'cookie-parser';
import trainingPackageRouter from './routes/trainingPackageRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRouter from './routes/userRouter.js';
import enrollmentRouter from './routes/enrollmentRouter.js';
import paymentRouter from './routes/paymentRouter.js';


const __fileName=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__fileName);


const port=process.env.PORT;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get('/', (req,res)=>{

    res.send("APIS SUCCESSFUL:");
});


// Routes to Training Packages
app.use('/api/trainingPackages', trainingPackageRouter);


//Routes to enrollments
app.use('/api/enrollments', enrollmentRouter);


//Routes to enrollments
app.use('/api/payments', paymentRouter);

app.use('/api/users', userRouter);

//Image upload API
app.use('/api/upload', uploadRouter);


// Serve static files from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));




app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on ${port}`));