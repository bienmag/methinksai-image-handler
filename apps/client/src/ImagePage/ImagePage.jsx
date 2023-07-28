import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WritingComments, ReadingComments, ImageReadingComments } from './CommentsStates';
import { ImageCard } from './ImageCard';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import { useViewport } from '../utils/viewport';
import LatptopView from './LaptopView';

function ImagePage({ images }) {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [readingMode, setReadingMode] = useState(false);
  const [writingMode, setWritingMode] = useState(false);
  const [dicomImage, setDicomImage] = useState(false);
  const commentsContainerRef = useRef(null);

  const image = images.find((item) => item.id == id);
  const { width } = useViewport();
  const breakpoint = 1280;
  const isDicom = id.slice(0, 3);

  useEffect(() => {
    if (isDicom === 'vhm') {
      setDicomImage(true);
    }
  }, [id]);

  useEffect(() => {
    const socket = io('https://goldfish-app-ofd38.ondigitalocean.app/');
    socket.on('new comment', (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });
    return () => socket.disconnect();
  }, [id]);

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [comments]);

  async function handleSubmitComment() {
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');

    await axios
      .post(`https://goldfish-app-ofd38.ondigitalocean.app/image/${id}`, {
        text: comment,
        time: createdAt,
      })
      .then(() => {
        setComment('');
      })
      .catch((e) => {
        alert(e.response.data.error);
      });
  }

  useEffect(() => {
    async function getCommentsFromDB() {
      try {
        const response = await axios.get(
          `https://goldfish-app-ofd38.ondigitalocean.app/image/${id}`
        );
        setComments(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getCommentsFromDB();
  }, []);

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

  return !image && !dicomImage ? (
    <div className="h-screen flex justify-center items-center"> Loading...</div>
  ) : width > breakpoint ? (
    <>
      <Link to={'/'} className="absolute flex h-[46px] items-center pt-4 pl-4">
        Go Back
      </Link>

      <div className="h-screen flex items-center justify-center">
        <LatptopView
          id={id}
          dicomImage={dicomImage}
          image={image}
          comments={comments}
          setReadingMode={setReadingMode}
          readingMode={readingMode}
          writingMode={writingMode}
          setWritingMode={setWritingMode}
          comment={comment}
          closeComments={closeComments}
          handleEnterKey={handleEnterKey}
          handleInputComment={handleInputComment}
          handleSubmitComment={handleSubmitComment}
          commentsContainerRef={commentsContainerRef}
        ></LatptopView>
      </div>
    </>
  ) : (
    <div>
      <Link to={'/'} className="absolute flex h-[46px] items-center pt-4 pl-4">
        Go Back
      </Link>
      {readingMode && (
        <div data-testid="reading-mode">
          <ImageReadingComments
            dicomImage={dicomImage}
            id={id}
            setReadingMode={setReadingMode}
            readingMode={readingMode}
            image={image}
          ></ImageReadingComments>
          <ReadingComments
            comments={comments}
            comment={comment}
            setWritingMode={setWritingMode}
            writingMode={writingMode}
          ></ReadingComments>
        </div>
      )}

      {!readingMode && (
        <div datatestid="image-card" className="h-screen flex items-center justify-center ">
          <ImageCard
            dicomImage={dicomImage}
            id={id}
            image={image}
            comments={comments}
            setReadingMode={setReadingMode}
            readingMode={readingMode}
          ></ImageCard>
        </div>
      )}

      {writingMode && (
        <div data-testid="writing-mode">
          <WritingComments
            commentsContainerRef={commentsContainerRef}
            closeComments={closeComments}
            comment={comment}
            comments={comments}
            handleEnterKey={handleEnterKey}
            handleInputComment={handleInputComment}
            handleSubmitComment={handleSubmitComment}
            handleX={handleX}
          ></WritingComments>
        </div>
      )}
    </div>
  );
}
export default ImagePage;
