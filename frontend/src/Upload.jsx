
import { useState } from 'react'
import axios from 'axios'

export default function Upload(){
  const [file,setFile]=useState(null)

  const upload=async()=>{
    const form=new FormData()
    form.append("file",file)
    await axios.post("http://localhost:3000/upload",form)
    alert("uploaded")
  }

  return(
    <div className="card">
      <h3>Upload Document</h3>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={upload}>Upload</button>
    </div>
  )
}
