class LoanApplication {
  constructor(customerNumber) {
    this.customerNumber = customerNumber;
    this.status = 'NEW';
    this.amount = null;
    this.score = null;
    this.limitAmount = null;
    this.scoringToken = null;
  }
}

const store = new Map();
module.exports = { LoanApplication, store };
