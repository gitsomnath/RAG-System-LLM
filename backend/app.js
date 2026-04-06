import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.js";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());   // 👈 ADD THIS
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);

app.listen(3000, () => {
  console.log("LLM RAG server running on port 3000");
});