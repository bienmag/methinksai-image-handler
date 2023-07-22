import { useContext } from 'react';
import { ThemeContext } from '../utils/context';
import commentLight from '../assets/comment-light.png';
import commentDark from '../assets/comment-dark.png';

export const ImageCard = ({ image, comments, setReadingMode, readingMode }) => {
  const theme = useContext(ThemeContext);

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
            {theme === 'dark' ? (
              <img height={20} width={20} src={commentLight}></img>
            ) : (
              <img height={20} width={20} src={commentDark}></img>
            )}

            {comments.length}
          </div>
        </div>
      </div>
    </div>
  );
};
