import Comment from '../Models/Comments.js';

const CommentsController = {
  async createComment(req, res, next) {
    try {
      const { text, time } = req.body;
      const comment = await Comment.create(text, time);
      res.status(201).json(comment);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  async getComments(req, res, next) {
    try {
      const imageId = req.params;
      const comments = await Comment.getAll(imageId);
      res.status(201).json(comments);
    } catch (e) {
      next(e);
    }
  },
};

export default CommentsController;
