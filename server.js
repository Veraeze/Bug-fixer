require('dotenv').config();
const express = require('express');
const axios = require('axios');
const {Configuration, OpenAIApi} = require('openai');
const { error } = require('console');
const { Messages } = require('openai/resources/chat/completions/messages.mjs');
const { Models } = require('openai/resources/models.mjs');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

app.post('/api/bugfix', async (req, res) => {
    const {bugDescription} = req.body;

    if (!bugDescription) {
        return res.status(400).json({error: 'please provide a bug description'})
    }

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {role: 'system', content: 'helpful assistant in fixing bugs'},
                {role: 'user', content: `fix the following bug: ${bugDescription}`},
            ]
        })
    } catch (error) {
        
    }
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})