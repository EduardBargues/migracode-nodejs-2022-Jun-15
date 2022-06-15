const fs = require("fs");
const databaseFile = "database.quotes.json";

function getQuotesFromDatabase() {
  const text = fs.readFileSync(databaseFile);
  return JSON.parse(text);
}
function saveQuotesToDatabase(arr) {
  const text = JSON.stringify(arr, null, 2);
  fs.writeFileSync(databaseFile, text);
}

module.exports = {
  getQuotesFromDatabase,
  saveQuotesToDatabase,
};
