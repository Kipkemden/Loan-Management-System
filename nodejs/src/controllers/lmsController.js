const { LoanApplication, store } = require('../models/loanApplication');
const cbsService = require('../services/cbsService');
const scoringService = require('../services/scoringService');

class LmsController {
  subscribe(req, res) {
    const { customerNumber } = req.body;
    if (!store.has(customerNumber)) {
      store.set(customerNumber, new LoanApplication(customerNumber));
      return res.json({ message: 'Subscribed successfully' });
    }
    res.status(400).json({ error: 'Customer already subscribed' });
  }

  async requestLoan(req, res) {
    const { customerNumber, amount } = req.body;
    const app = store.get(customerNumber);
    if (!app || (app.status !== 'NEW' && app.status !== 'REJECTED')) {
      return res.status(400).json({ error: 'Cannot apply: Active loan exists or not subscribed' });
    }

    app.amount = amount;
    app.status = 'PENDING';

    try {
      await cbsService.getKyc(customerNumber);
      const token = await scoringService.initiateQueryScore(customerNumber);
      app.scoringToken = token;
      const scoreData = await scoringService.queryScore(token);
      app.score = scoreData.score;
      app.limitAmount = scoreData.limitAmount;
      app.status = amount <= scoreData.limitAmount ? 'APPROVED' : 'REJECTED';
    } catch (err) {
      app.status = 'REJECTED';
    }

    store.set(customerNumber, app);
    res.json({ status: app.status });
  }

  getLoanStatus(req, res) {
    const app = store.get(req.params.customerNumber);
    if (!app) return res.status(404).json({ error: 'Loan not found' });
    res.json(app);
  }
}

module.exports = new LmsController();
