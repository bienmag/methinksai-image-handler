import { ObjectId } from 'mongodb';
import { DBComment } from '../lib/mongo.js';

class Comment {
  constructor(_id, text, time, imageId) {
    this._id = _id;
    this.imageId = imageId;
    this.text = text;
    this.time = time;
  }
  static async create(text, time, imageId) {
    const _id = new ObjectId();
    await DBComment.create({ _id, text, time, imageId });
    return new Comment(_id, text, time, imageId);
  }

  static async getAll(imageId) {
    return await DBComment.find(imageId);
  }
}

export default Comment;
