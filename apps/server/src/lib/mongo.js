import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  _id: Object,
  text: String,
  time: String,
});

export const DBComment = mongoose.model('DBComment', commentSchema, 'comments');
