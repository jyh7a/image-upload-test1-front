import { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ImageLayout from './ImageLayout';  // 새로운 컴포넌트

import './App.css'

async function postImage({image, title}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("title", title)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App() {

  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, title})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <Router>
    <Switch>
      <Route path="/image-layout">
        <ImageLayout />
      </Route>
      <Route path="/">
      <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={title} onChange={e => setTitle(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

      <img src="/images/89663a190338356b979c13d332211578"></img>

    </div>
      </Route>
    </Switch>
  </Router>


  );
}

export default App;
