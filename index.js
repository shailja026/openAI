const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const PORT = 3030;

const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

app.get("/", (req, res) => {
  res.send("Working on openAI");
});

app.get("/getResponse", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const airesponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
          max_tokens: 100,
        },
      ],
    });
    //    console.log(airesponse)
    res.send(airesponse.choices[0].message.content);
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
