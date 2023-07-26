import express from 'express';
import CommentsController from './Controllers/Comments.controller.js';

const router = express.Router();

router.post('/image/:imageId', CommentsController.createComment);
router.get('/image/:imageId', CommentsController.getComments);

export default router;
