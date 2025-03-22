const axios = require('axios');
const retry = require('retry');

class ScoringService {
  async initiateQueryScore(customerNumber) {
    const response = await axios.get(
      `https://scoringtest.credable.io/api/v1/scoring/initiateQueryScore/${customerNumber}`,
      { headers: { 'client-token': process.env.SCORING_CLIENT_TOKEN } }
    );
    return response.data;
  }

  async queryScore(token) {
    const operation = retry.operation({ retries: 5, minTimeout: 2000 });

    return new Promise((resolve, reject) => {
      operation.attempt(async (currentAttempt) => {
        try {
          const response = await axios.get(
            `https://scoringtest.credable.io/api/v1/scoring/queryScore/${token}`,
            { headers: { 'client-token': process.env.SCORING_CLIENT_TOKEN } }
          );
          resolve(response.data);
        } catch (err) {
          if (operation.retry(err)) return;
          reject(operation.mainError() || new Error('Scoring failed after retries'));
        }
      });
    });
  }
}

module.exports = new ScoringService();
