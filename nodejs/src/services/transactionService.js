const express = require('express');
const cbsService = require('./cbsService');
const axios = require('axios');

const router = express.Router();

router.get('/:customerNumber', async (req, res) => {
  try {
    const transactions = await cbsService.getTransactions(req.params.customerNumber);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

async function registerEndpoint() {
  const payload = {
    url: process.env.TRANSACTION_ENDPOINT,
    name: 'LMS-Transaction-Service',
    username: 'user',
    password: 'pass',
  };
  try {
    const response = await axios.post(
      'https://scoringtest.credable.io/api/v1/client/createClient',
      payload
    );
    process.env.SCORING_CLIENT_TOKEN = response.data.token;
    console.log('Transaction endpoint registered:', response.data);
  } catch (err) {
    console.error('Failed to register endpoint:', err.message);
  }
}

module.exports = { router, registerEndpoint };
