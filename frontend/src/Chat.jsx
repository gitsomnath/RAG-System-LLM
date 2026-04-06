
import { useState } from 'react'
import axios from 'axios'

export default function Chat(){
  const [q,setQ]=useState("")
  const [msgs,setMsgs]=useState([])

  const send=async()=>{
    const res=await axios.post("http://localhost:3000/chat",{question:q})
    setMsgs([...msgs,{role:"You",text:q},{role:"AI",text:res.data.answer}])
    setQ("")
  }

  return(
    <div className="card">
      <h3>Chat</h3>
      <div className="chat">
        {msgs.map((m,i)=>(
          <div key={i}><b>{m.role}:</b> {m.text}</div>
        ))}
      </div>
      <input value={q} onChange={e=>setQ(e.target.value)}/>
      <button onClick={send}>Send</button>
    </div>
  )
}
