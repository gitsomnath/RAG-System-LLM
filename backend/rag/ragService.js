import fetch from "node-fetch";

export const generateAnswer = async (context, question) => {
  
    console.log("Ollama response: initializing answer generation");
  try {
    const prompt = `
You are an AI assistant. Answer using context.

Context:
${context}

Question:
${question}

Answer:
`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral:latest",
        prompt: prompt,
        stream: false
      })
    });

    const data = await response.json();
    console.log("Ollama response:", data);
    return data.response;

  } catch (error) {
    console.error("Ollama error:", error);
    return "Error generating answer";
  }
};