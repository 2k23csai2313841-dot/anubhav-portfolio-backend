import { groqcalling } from "../middlewares/groqCall.middlewares.js";
import { myDB } from "../middlewares/myData.middlewares.js";
import chatAssist from "../model/chatAssistant.js";

export const chatAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const query = `
You are a chat assistant and the personal assistant of Anubhav Singh.
I am providing you Anubhav's personal portfolio data below.

If the user's question is related to Anubhav Singh, answer using only the provided data.
If the question is not related to Anubhav, answer it using your general knowledge.

You may include relevant links if they are helpful.
Keep the answer clear and concise, preferably within 2–3 lines.
The response should be in English with a neutral tone (not too formal, not too casual).

User Question:
${question}

Anubhav's Data:
${myDB}
`;


    const answer = await groqcalling(query);

    await chatAssist.save({ question, answer });

    res.json({ answer });
  } catch (error) {
    console.error("Error in chatAssistant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
