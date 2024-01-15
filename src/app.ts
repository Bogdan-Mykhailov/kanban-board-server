import express from 'express';
import { cardRouter } from './routes/Card';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 8000;
const DB = process.env.DATABASE;

const createServer = async() => {
  const app = express();

  try {
    await mongoose.connect(DB);
    console.log('DB connection successful!');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }

  app.use(express.json(), cardRouter);

  return app;
};

createServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
