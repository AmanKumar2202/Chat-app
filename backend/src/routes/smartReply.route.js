
import express from "express"
import { generateSmartReplies } from "../utils/smartReply.js";


const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const replies = await generateSmartReplies(message);
    console.log(replies);
    return res.json({ replies });
  } catch (err) {
    console.error("Smart Reply Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate smart replies" });
  }
});

export default router;
