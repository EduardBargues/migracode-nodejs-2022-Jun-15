const database = require("./db.users");
const bcrypt = require("bcrypt");
const constantNumber = 10;

async function signUp(request, response) {
  const newUser = request.body;
  const users = database.getUsers();
  const sameUser = users.find((u) => u.userName === newUser.userName);
  if (sameUser) {
    response
      .status(400)
      .json({ message: "user with same userName already exists." });
  } else {
    const ids = users.map((u) => u.id);
    newUser.id = Math.max([...ids]) + 1;
    const salt = await bcrypt.genSalt(constantNumber);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    users.push(newUser);

    database.saveUsers(users);
    response.status(201).json({ id: newUser.id, userName: newUser.userName });
  }
}

module.exports = {
  signUp,
};
