require('dotenv').config();
const express = require('express');
const cors = require('cors')
// const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })
const openai = new OpenAIApi(configuration)

app.post('/api/bugfix', async (req, res) => {
    const {bugDescription} = req.body;

    if (!bugDescription) {
        return res.status(400).json({error: 'please provide a bug description'})
    }

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'helpful assistant in fixing bugs'},
                {role: 'user', content: `fix the following bug: ${bugDescription}`},
            ]
        });
        const fix = response.data.choices[0].message.content;
        res.status(200).json({fix});

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({error: 'Failed to fetch a fix from AI'});
    }
});

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})

// console.log("api key is:", process.env.OPENAI_API_KEY);