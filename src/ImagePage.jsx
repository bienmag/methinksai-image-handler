import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ImagePage({ images }) {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [readingMode, setReadingMode] = useState(false);
  const [writingMode, setWritingMode] = useState(false);
  const image = images.find((item) => item.id == id);

  function handleSubmitComment() {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  }

  function handleInputComment(e) {
    e.preventDefault();
    setComment(e.target.value);
  }
  function handleSetWritingMode() {
    setReadingMode(!readingMode);
    setWritingMode(!writingMode);
  }

  return !image ? (
    <div> Loading......</div>
  ) : (
    <div>
      <div>
        <h1> {image.common_name} </h1>
        <img src={`${image.default_image.regular_url}`} alt="image of a tree"></img>
      </div>

      <button
        onClick={() => {
          setReadingMode(!readingMode);
        }}
      >
        comment!
      </button>
      {readingMode && (
        <>
          <input value={comment} type="text" onClick={handleSetWritingMode}></input>
          <button onClick={handleSubmitComment} className="bg-my3">
            add a comment
          </button>
        </>
      )}

      {writingMode && (
        <div>
          <input value={comment} type="text" onChange={handleInputComment}></input>
          <button onClick={handleSubmitComment} className="bg-my3">
            add a comment
          </button>
        </div>
      )}

      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
}
export default ImagePage;
