import Comment from '../Models/Comments.js'

const CommentsController = {
  async createComment (req,res,next) {
    try {
      const {text, time} = req.body
      const comment = await Comment.create(text, time)
      res.status(201).json(comment)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }
}

export default CommentsController