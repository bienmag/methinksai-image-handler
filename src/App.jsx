import { useEffect, useState } from 'react';
import './App.css';
import API from './utils/api';
import List from './List';
import { Routes, Route } from 'react-router-dom';
import ImagePage from './ImagePage/ImagePage';
import sun from './assets/sun.png';
import moon from './assets/moon1.png';
import { ThemeContext } from './utils/context';
function App() {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('light');

  useEffect(() => {
    API.getImages().then((images) => {
      setImages(images);
    });
  }, []);

  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);
  return (
    <ThemeContext.Provider value={mode}>
      <div className="absolute w-full flex justify-end pt-4 pr-4">
        {mode === 'light' ? (
          <img
            src={moon}
            width={30}
            height={30}
            onClick={toggleMode}
            alt="moon icon to change theme"
          />
        ) : (
          <img
            src={sun}
            width={30}
            height={30}
            onClick={toggleMode}
            alt="sun icon to change theme"
          />
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
