const database = require("./db.quotes");

function getQuotes(request, response) {
  const quotes = database.getQuotesFromDatabase();

  response.send(quotes);
}
function getQuoteById(request, response) {
  const quoteId = Number(request.params.quoteId);
  const quotes = database.getQuotesFromDatabase();
  const quote = quotes.find((q) => q.id === quoteId);

  response.send(quote);
}
function saveQuote(request, response) {
  const newQuote = request.body;
  const quotes = database.getQuotesFromDatabase();
  const newId = quotes.length + 1;
  newQuote.id = newId;
  quotes.push(newQuote);

  database.saveQuotesToDatabase(quotes);

  response.status(201).send(newQuote);
}
function editQuote(request, response) {
  const newQuote = request.body;
  const quoteId = Number(request.params.quoteId);
  const quotes = database.getQuotesFromDatabase();
  const dbQuote = quotes.find((q) => q.id === quoteId);
  dbQuote.author = newQuote.author;
  dbQuote.quote = newQuote.quote;

  database.saveQuotesToDatabase(quotes);

  response.status(200).send(dbQuote);
}
function deleteQuote(request, response) {
  const quoteId = Number(request.params.quoteId);
  const quotes = database
    .getQuotesFromDatabase()
    .filter((q) => q.id != quoteId);
  database.saveQuotesToDatabase(quotes);
  response.send();
}

module.exports = {
  getQuotes,
  getQuoteById,
  saveQuote,
  editQuote,
  deleteQuote,
};
