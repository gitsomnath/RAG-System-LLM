import express from "express";

import { createEmbedding } from "../embeddings/embeddingService.js";
import { getAllVectors } from "../vector/redisVectorService.js";
import { generateAnswer } from "../rag/ragService.js";

const router = express.Router();

// cosine similarity
const similarity = (a, b) => {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
};

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    // create embedding for question
    const questionEmbedding = await createEmbedding(question);

    // fetch stored vectors
    const vectors = await getAllVectors();

    if (!vectors.length) {
      return res.json({ answer: "No documents uploaded yet." });
    }

    // score chunks
    const scored = vectors.map(item => ({
      text: item.text,
      score: similarity(item.embedding, questionEmbedding)
    }));

    // sort best first
    scored.sort((a, b) => b.score - a.score);

    // take top 3 context
    const topChunks = scored.slice(0, 3);

    const context = topChunks
      .map(c => c.text)
      .join("\n\n");

    // generate AI answer
    const answer = await generateAnswer(context, question);

    res.json({
      answer,
      sources: topChunks.map(c => c.text) // optional debug
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;