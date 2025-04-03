const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})