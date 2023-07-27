import express from 'express';
import CommentsController from './Controllers/Comments.controller.js';
import path from 'path';
import fs from 'fs'
import { __filename, __dirname } from './app.js';

const router = express.Router();

router.post('/image/:imageId', CommentsController.createComment);
router.get('/image/:imageId', CommentsController.getComments);
router.get('/dicom/:filename', (req, res)=> {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'static', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  });
});

export default router;
