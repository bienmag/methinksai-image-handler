import { ObjectId } from "mongodb";
import { DBComment } from "../lib/mongo.js";

class Comment {
  constructor(_id, text,time) {
    this._id = _id;
    this.text = text;
    this.time = time;
  }
static async create(text, time) {
  const _id =new ObjectId()
  await DBComment.create({_id, text, time})
  return new Comment(_id, text, time)
}

}

export default Comment