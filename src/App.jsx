import { useEffect, useState } from 'react'
import './App.css'
import API from './utils/api'
import List from './List'
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
      <List images={ images }></List>
    </>
  )
}

export default App
