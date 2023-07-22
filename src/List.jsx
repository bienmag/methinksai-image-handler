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
          <div className="">🔗</div>
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
          <h2 className="py-8 font-bold">OVER 10,000+ SPECIES OF PLANTS AVAILABLE</h2>
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
