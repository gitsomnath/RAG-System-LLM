
import express from "express";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { chunkText } from "../utils/chunkText.js";
import { createEmbedding } from "../embeddings/embeddingService.js";
import { storeVector } from "../vector/redisVectorService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const text = fs.readFileSync(req.file.path, "utf-8");
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      const embedding = await createEmbedding(chunk);
      await storeVector(uuidv4(), embedding, chunk);
    }
    res.json({ message: "Uploaded" });
  } catch (e) {
    res.status(500).json({ error: "upload failed" });
  }
});
export default router;
