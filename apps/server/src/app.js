import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router.js';
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

export function startServer() {
  const port = 8080;

  console.log('Connecting to database', MONGODB_URL, '...');
  mongoose
    .connect(MONGODB_URL, { dbName: MONGODB_DB })
    .then(() => {
      console.log('✅ Database connection successful');
    })
    .catch((error) => console.error(error));
  const server = app.listen(port, () => console.log(`Listening on port ${port}`));
  process.on('SIGTERM', () => {
    server.close();
  });
  return server;
}
