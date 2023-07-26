import { Link } from 'react-router-dom';

function ListItem({ image }) {
  return (
    <Link className="hover:bg-my2" to={`/image/${image.id}`}>
      <div className=" text-left px-4 grid border-my2 grid-flow-col border-b-[1px] min-h-12 w-full py-2 mt-2 items-center">
        <div className="flex flex-col  ">
          <h1 className="text-md text"> {image.common_name}</h1>
          <p className="text-xs"> id: {image.id}</p>
        </div>
        <div className="flex justify-end">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <title>clip icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function List({ images }) {
  return (
    <div className="pt-[46px]">
      {images.length === 0 ? (
        <div className="h-screen flex justify-center items-center">Loading... </div>
      ) : (
        <div className="flex flex-col text-center">
          <h2 className="py-8 text-2xl font-semibold">OVER 10,000+ SPECIES OF PLANTS AVAILABLE</h2>
          <div className="flex flex-col">
            {images.map((image) => (
              <ListItem key={image.id} image={image}></ListItem>
            ))}
          </div>
          <div className="py-8">{images.length} files</div>
        </div>
      )}
    </div>
  );
}

export default List;
