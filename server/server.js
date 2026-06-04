import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get('/',(req,res)=>{
    res.send('API is running...')
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})