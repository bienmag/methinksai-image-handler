import { CommentsList } from './Comments';

export const ReadingComments = ({ setWritingMode, writingMode, comments, comment }) => {
  return (
    <div className="border rounded-xl border-myinputborder flex flex-col-reverse  bg-my1  w-full h-1/2 absolute bottom-0 pb-2  ">
      <div className=" flex justify-center my-2 ">
        <input
          onClick={() => {
            setWritingMode(!writingMode);
          }}
          className=" border-2 border-my3 focus:border-my4 rounded-full  mr-2  w-3/4  px-4 "
          value={comment}
          type="text"
          placeholder="add a comment"
        ></input>
        <button className="bg-my2  border-my3 border-2 hover:bg-my3  font-bold py-2 px-2 w-24 rounded-full">
          Send
        </button>
      </div>
      <div className="overflow-auto mt-12">
        {comments.length > 0 ? <CommentsList comments={comments} /> : <></>}
      </div>
      <div className=" flex pl-4 h-12 absolute top-0">
        <p className="flex items-center">{comments.length} comments</p>
      </div>
    </div>
  );
};

export const WritingComments = ({
  closeComments,
  comments,
  handleEnterKey,
  comment,
  handleInputComment,
  handleSubmitComment,
  handleX,
}) => {
  return (
    <div
      onKeyDown={closeComments}
      className="border rounded-xl border-myinputborder flex flex-col-reverse bg-my1  w-full h-screen absolute bottom-0 pb-2 "
    >
      <div className="flex justify-center my-2 px-2 ">
        <input
          className="border-2 border-my3 focus:border-my4 rounded-full bg-my2 mr-2  w-3/4  px-4 "
          onKeyDown={handleEnterKey}
          value={comment}
          type="text"
          onChange={handleInputComment}
          placeholder="add a comment"
        ></input>
        <button
          className="bg-my2  border-my3 border-2 hover:bg-my3  font-bold py-2 px-2 w-24 rounded-full"
          onClick={handleSubmitComment}
        >
          Send
        </button>
      </div>
      <div className=" overflow-auto mt-12">
        {comments.length > 0 ? <CommentsList comments={comments} /> : <></>}
      </div>
      <div className="flex justify-between  w-screen px-4 h-12 absolute top-0">
        <p className="flex items-center">{comments.length} comments</p>
        <button className="flex items-center" onClick={handleX}>
          x
        </button>
      </div>
    </div>
  );
};
