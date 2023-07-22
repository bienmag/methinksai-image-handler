import moment from 'moment';

export const CommentCard = ({ text }) => {
  const time = moment().fromNow();
  return (
    <div className="mx-2 rounded-lg border-[0.5px] flex flex-col items-left my-1 py-3 justify-between text-left px-8 max-w-full  bg-my3 grid-flow-col ">
      <p className="flex text-xs opacity-80">{time}</p>
      <p className="flex break-all">{text}</p>
    </div>
  );
};

export const CommentsList = ({ comments }) => {
  return comments.map((text, index) => <CommentCard key={index} text={text} />);
};
