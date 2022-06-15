const database = require("./db.users");

function signUp(request, response) {
  const newUser = request.body;
  const users = database.getUsers();
  const ids = users.map((u) => u.id);
  newUser.id = Math.max([...ids]) + 1;
  users.push(newUser);
  database.saveUsers(users);
  response.status(201).json({ id: newUser.id, userName: newUser.userName });
}

module.exports = {
  signUp,
};
