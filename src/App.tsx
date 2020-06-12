import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'

const App: React.FC = () => {
  const [ title, setTitle ] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello'
  }
  useEffect(() => {
    console.log('发送请求')
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(resp => {
        setTitle(resp.data.title)
      })
  }, [])
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      // form 表单对象
      const formData = new FormData()
      // 添加值
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(resp => {
        console.log(resp)
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
      </header>
      <input type="file" name="myFile" onChange={handleFileChange}/>
    </div>
  )
}
export default App;