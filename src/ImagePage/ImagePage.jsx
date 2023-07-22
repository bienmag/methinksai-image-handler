import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WritingComments, ReadingComments } from './CommentsStates';
import { ImageCard } from './ImageCard';

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

  function closeComments(e) {
    if (e.key === 'Escape') {
      setReadingMode(!readingMode);
      setWritingMode(!writingMode);
    }
  }

  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      handleSubmitComment();
    }
  }

  function handleX() {
    setReadingMode(!readingMode);
    setWritingMode(!writingMode);
  }

  console.log('readingMode', readingMode);

  return !image ? (
    <div> Loading......</div>
  ) : (
    <div>
      {readingMode && (
        <ReadingComments
          comments={comments}
          comment={comment}
          setWritingMode={setWritingMode}
          writingMode={writingMode}
        ></ReadingComments>
      )}

      {!readingMode && (
        <ImageCard
          image={image}
          comments={comments}
          setReadingMode={setReadingMode}
          readingMode={readingMode}
        ></ImageCard>
      )}

      {writingMode && (
        <WritingComments
          closeComments={closeComments}
          comment={comment}
          comments={comments}
          handleEnterKey={handleEnterKey}
          handleInputComment={handleInputComment}
          handleSubmitComment={handleSubmitComment}
          handleX={handleX}
        ></WritingComments>
      )}
    </div>
  );
}
export default ImagePage;
