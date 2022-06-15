const fs = require("fs");
const databaseFile = "database.users.json";

function getUsers() {
  const text = fs.readFileSync(databaseFile);
  return JSON.parse(text);
}
function saveUsers(arr) {
  const text = JSON.stringify(arr, null, 2);
  fs.writeFileSync(databaseFile, text);
}

module.exports = {
  getUsers,
  saveUsers,
};
