import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();
const app = express();



app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});