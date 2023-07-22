import { useEffect, useState } from 'react'
import './App.css'
import API from './utils/api'
import List from './List'
import { Routes, Route } from 'react-router-dom'
import ImagePage from './ImagePage'
function App ()
{

  const [images, setImages] = useState([])

  useEffect(() =>
  {
    API.getImages().then((images) =>
    {
      setImages(images)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={ <List images={ images } /> }> </Route>
        <Route path='image/:id' element={ <ImagePage /> }></Route>
      </Routes >
    </>
  )
}

export default App
