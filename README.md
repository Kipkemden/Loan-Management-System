# Loan-Management-System
Credable Technical Assesment-Loan Management System
Add-Content -Path README.md -Value @'

## Notes
- The Scoring Engine endpoint (`https://scoringtest.credable.io/api/v1/client/createClient`) was unreachable during testing (`Unable to connect to the remote server` / `ETIMEDOUT`). A temporary `SCORING_CLIENT_TOKEN` was used in `.env` for local testing. In a production scenario, the endpoint would be registered to obtain a valid token.
- Retry logic was implemented in `transactionService.js` but disabled due to persistent connectivity issues.
'@```

