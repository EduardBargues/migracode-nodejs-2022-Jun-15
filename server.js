const express = require("express");
const apiQuotes = require("./api.quotes");
const apiUsers = require("./api.users");
const auth = require("./middleware.auth");

const app = express();
app.use(express.json());
app.get("/quotes", apiQuotes.getQuotes);
app.post("/quotes", apiQuotes.saveQuote);
app.get("/quotes/:quoteId", apiQuotes.getQuoteById);
app.put("/quotes/:quoteId", apiQuotes.editQuote);
app.delete("/quotes/:quoteId", auth.authenticate, apiQuotes.deleteQuote);
app.post("/signup", apiUsers.signUp);
app.post("/signin", apiUsers.signIn);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
