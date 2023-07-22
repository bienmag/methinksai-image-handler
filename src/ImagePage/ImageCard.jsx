import { Link } from 'react-router-dom';

export const ImageCard = ({ image, comments, setReadingMode, readingMode }) => {
  return (
    <div className=" flex flex-col max-w-full items-center px-4">
      <div className="flex flex-col  ">
        <div className="flex flex-col  mt-5 md:mt-4 lg:mt-4 max-w-[600px] items-center">
          <h1 className="text-2xl mb-5"> {image.common_name} </h1>
          <img src={`${image.default_image.regular_url}`} alt="image of a tree"></img>
        </div>
        <div className="flex justify-end">
          <div
            className="items-center flex justify-between px-8 mt-4 text-xs bg-myborder w-28 py-2  rounded-full border border-my2 hover:bg-my2 "
            onClick={() => {
              setReadingMode(!readingMode);
            }}
          >
            add
            {comments.length}
          </div>
        </div>
      </div>
    </div>
  );
};
