import { useEffect, useState } from 'react';
import './App.css';
import API from './utils/api';
import List from './List';
import { Routes, Route } from 'react-router-dom';
import ImagePage from './ImagePage/ImagePage';
import { ThemeContext } from './utils/context';
function App() {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('light');

  useEffect(() => {
    API.getImages().then((images) => {
      setImages(images);
    });
  }, []);

  useEffect(() => {
    localStorage.getItem('theme') ? setMode(localStorage.getItem('theme')) : setMode('light');
  }, []);

  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={mode}>
      <div className="absolute w-full flex justify-end pt-4 pr-4">
        {mode === 'light' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
            onClick={toggleMode}
            alt="moon icon to change theme"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
            onClick={toggleMode}
            alt="sun icon to change theme"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}
      </div>
      <Routes>
        <Route path="/" element={<List images={images} />}></Route>
        <Route path="image/:id" element={<ImagePage images={images} />}></Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
