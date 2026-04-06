
import Chat from './Chat.jsx'
import Upload from './Upload.jsx'

export default function App(){
  return (
    <div className="container">
      <h1>LLM RAG Assistant</h1>
      <Upload />
      <Chat />
    </div>
  )
}
