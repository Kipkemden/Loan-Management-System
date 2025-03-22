require('dotenv').config();
const express = require('express');
const lmsRoutes = require('./src/routes/lmsRoutes');
const transactionService = require('./src/services/transactionService');

const app = express();
app.use(express.json());
app.use('/api/lms', lmsRoutes);
app.use('/api/transaction', transactionService.router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await transactionService.registerEndpoint();
});
