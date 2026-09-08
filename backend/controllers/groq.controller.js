import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const groqController = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                message: "Prompt is required"
            });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "openai/gpt-oss-20b"
        });

        const reply = chatCompletion.choices[0]?.message?.content || "";

        res.json({
            reply
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};