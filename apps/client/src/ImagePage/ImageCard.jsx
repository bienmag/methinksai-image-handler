import { useContext } from 'react';
import { ThemeContext } from '../utils/context';
import { useViewport } from '../utils/viewport';

export const ImageCard = ({ image, comments, setReadingMode, readingMode }) => {
  const theme = useContext(ThemeContext);
  const { width } = useViewport();

  return (
    <div className=" flex flex-col max-w-full items-center px-4">
      <div className="flex flex-col  ">
        <div className="flex flex-col  mt-5 md:mt-4 lg:mt-4 max-w-[600px] items-center">
          <h1 className="text-2xl mb-5"> {image.common_name} </h1>
          <img src={`${image.default_image.regular_url}`} alt="image of a tree"></img>
        </div>
        <div className="flex justify-end">
          <div
            data-testid="comment-button"
            className="items-center flex justify-between px-8 mt-4 text-xs bg-myborder w-28 py-2  rounded-full border border-my2 hover:bg-my2 "
            onClick={() => {
              setReadingMode(!readingMode);
            }}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <title>comment icon to add comments section</title>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <title>comment icon to add comments section</title>
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {comments.length}
          </div>
        </div>
      </div>
    </div>
  );
};
