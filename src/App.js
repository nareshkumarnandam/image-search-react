import './App.css';
// import data from '../key.json';
import axios from 'axios';
import React, { useRef, useState } from 'react'

function App() {
  const inputRef = useRef();
  const [imageLink, setImageLink] = useState();

  const url = "https://api-inference.huggingface.co/models/prompthero/openjourney-v4";

  function clickHandler(){

      const data = {
          "input": `${inputRef.current.value}`
      }


      axios.post(url,{
          inputs:JSON.stringify(data)
      },{
          headers:{
              Autherization: data.access_token
          },
          responseType: "blob"
      })
      .then((res)=>{
          const image = URL.createObjectURL(res.data);
          setImageLink(image)
      })

  }
  return (
    <div className="App">
      <header>
            <h1>Image generator</h1>
        </header>
        <div id='input-container'>
            <input ref={inputRef} type='text' placeholder='Search for the image...'/>
            <button onClick={clickHandler}>Generate</button>
        </div>
        <div id='image-container'>
            {imageLink && <img src = {imageLink} alt={`image of ${inputRef.current?.value}`}/>}
        </div>
    </div>
  );
}

export default App;
