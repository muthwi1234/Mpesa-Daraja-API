const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/mpesa/stkpush', async (req, res) => {
    try {
        const token = await generateAccessToken();
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', req.body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const generateAccessToken = async () => {
    const consumerKey = 'YOUR_CONSUMER_KEY';
    const consumerSecret = 'YOUR_CONSUMER_SECRET';
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const { data } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });

    return data.access_token;
};

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
