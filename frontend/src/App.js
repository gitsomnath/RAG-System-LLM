
import React from "react";
import Chat from "./Chat";
import Upload from "./Upload";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>LLM RAG Assistant</h2>
      <Upload />
      <hr />
      <Chat />
    </div>
  );
}

export default App;
