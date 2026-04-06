
import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:3000/chat", {
      question,
    });

    setMessages([
      ...messages,
      { role: "user", text: question },
      { role: "bot", text: res.data.answer },
    ]);

    setQuestion("");
  };

  return (
    <div>
      <h3>Ask Question</h3>

      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
