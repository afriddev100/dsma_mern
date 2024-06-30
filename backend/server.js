
import express from 'express';
import  cors from 'cors';
import bodyParser from  'body-parser';

const port=5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req,res)=>{

    res.send("APIS SUCCESSFUL:");
});


// POST endpoint to enroll
app.post('/enroll', (req, res) => {
    // Log the request body
    console.log('Request Body:', req.body);
  
  
    res.json({ message: 'Enrollment successful', data: req.body });
  });


app.listen(port,()=>console.log(`Server running on ${port}`));