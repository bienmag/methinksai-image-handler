import { CommentsList } from './Comments';

export const LaptopView = ({
  image,
  comments,
  closeComments,
  handleEnterKey,
  handleInputComment,
  handleSubmitComment,
  commentsContainerRef,
  handleX,
  comment,
}) => {
  return (
    <div className="grid grid-cols-4  w-full ">
      <div className="col-span-3">
        <div className=" flex flex-col max-w-full items-center px-4 h-screen justify-center ">
          <div className="flex flex-col  ">
            <div className="flex flex-col  mt-5 md:mt-4 lg:mt-4 max-w-[600px] items-center">
              <h1 className="text-2xl mb-5"> {image.common_name} </h1>
              <img src={`${image.default_image.regular_url}`} alt="image of a tree"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-xl border-myinputborder flex flex-col-reverse  bg-my1  h-full pb-2  ">
        {/* <div
          onKeyDown={closeComments}
          className="border rounded-xl border-myinputborder flex flex-col-reverse bg-my1  w-full h-screen absolute bottom-0 pb-2 "
        > */}
        <div className="flex justify-center my-2 px-2 ">
          <input
            autoFocus
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
        <div className=" overflow-auto mt-12" ref={commentsContainerRef}>
          {comments.length > 0 ? (
            <div data-testid="comments-list">
              <CommentsList comments={comments} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-between  w-screen px-4 h-12 absolute top-0">
          {comments.length === 1 ? (
            <p className="flex items-center">{comments.length} comment</p>
          ) : (
            <p className="flex items-center">{comments.length} comments</p>
          )}
          <button className="flex items-center" onClick={handleX}>
            x
          </button>
        </div>
      </div>{' '}
    </div>
    // </div>
  );
};

export default LaptopView;
