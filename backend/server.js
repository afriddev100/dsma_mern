import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import connectDB from './config/db.js';
import  cors from 'cors';
import bodyParser from  'body-parser';
import trainingPackageRoutes from './routes/trainingPackageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
const __fileName=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__fileName);


const port=process.env.PORT;
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());




app.get('/', (req,res)=>{

    res.send("APIS SUCCESSFUL:");
});


// Routes to Training Packages
app.use('/api/trainingPackages', trainingPackageRoutes);


app.use('/api/users', userRoutes);

//Image upload API
app.use('/api/upload', uploadRoutes);


// Serve static files from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));




app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on ${port}`));