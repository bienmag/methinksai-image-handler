export const CommentCard = ({ comment }) => {
  return (
    <div className="mx-2 rounded-lg border-[0.5px] flex flex-col items-left my-1 py-3 justify-between text-left px-8 max-w-full  bg-my3 grid-flow-col ">
      <p className="flex text-xs opacity-80">{comment.time}</p>
      <p className="flex break-all">{comment.text}</p>
    </div>
  );
};

export const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => <CommentCard key={index} comment={comment} />);
};
