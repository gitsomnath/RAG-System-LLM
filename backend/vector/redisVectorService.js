
import { createClient } from "redis";
const client = createClient({ url: process.env.REDIS_URL });
await client.connect();

export const storeVector = async (id, embedding, text) => {
  await client.hSet(`doc:${id}`, {
    embedding: JSON.stringify(embedding),
    text,
  });
};

export const getAllVectors = async () => {
  const keys = await client.keys("doc:*");
  const results = [];
  for (const key of keys) {
    const data = await client.hGetAll(key);
    results.push({
      embedding: JSON.parse(data.embedding),
      text: data.text,
    });
  }
  return results;
};
