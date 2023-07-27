import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router.js';
import { Server } from 'socket.io';
import * as http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;
 export const __filename = fileURLToPath(import.meta.url);
 export const __dirname = dirname(__filename);

const app = express();
const myserver = http.createServer(app);
export const io = new Server(myserver, {
  cors: {
    origin: 'https://methinksai-image-handler.vercel.app',
    methods: ['GET', 'POST'],
  },
});
app.use(express.json());
app.use(express.static(join(__dirname, 'static')));
app.use(cors());
app.use(router);

export function startServer() {
  const port = 8080;

  console.log('Connecting to database', MONGODB_URL, '...');
  mongoose
    .connect(MONGODB_URL, { dbName: MONGODB_DB })
    .then(() => {
      console.log('✅ Database connection successful');

      io.on('connection', (socket) => {
        console.log('A client connected');

        socket.on('disconnect', () => {
          console.log('A client disconnected');
        });
      });
    })
    .catch((error) => console.error(error));
  const server = myserver.listen(port, () => console.log(`Listening on port ${port}`));
  process.on('SIGTERM', () => {
    server.close();
  });
  return server;
}
