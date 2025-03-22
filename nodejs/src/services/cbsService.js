const soap = require('soap');
const path = require('path');

const CBS_CREDS = {
  username: process.env.CBS_USERNAME,
  password: process.env.CBS_PASSWORD,
};

class CbsService {
  async getKyc(customerNumber) {
    const wsdlPath = path.join(__dirname, '../../wsdl/customerWsdl.wsdl');
    const client = await soap.createClientAsync(wsdlPath);
    return new Promise((resolve, reject) => {
      client.Customer({ customerNumber, ...CBS_CREDS }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async getTransactions(customerNumber) {
    const wsdlPath = path.join(__dirname, '../../wsdl/transactionWsdl.wsdl');
    const client = await soap.createClientAsync(wsdlPath);
    return new Promise((resolve, reject) => {
      client.Transactions({ customerNumber, ...CBS_CREDS }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = new CbsService();
