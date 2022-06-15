const database = require("./db.users");
const bcrypt = require("bcrypt");
const constantNumber = 10;
const jwt = require("./jwt");

async function signUp(request, response) {
  const newUser = request.body;
  const users = database.getUsers();
  const sameUser = users.find((u) => u.userName === newUser.userName);
  if (sameUser) {
    return response
      .status(400)
      .json({ message: "user with same userName already exists." });
  }

  const salt = await bcrypt.genSalt(constantNumber);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const ids = users.map((u) => u.id);
  newUser.id = Math.max([...ids]) + 1;
  users.push(newUser);
  database.saveUsers(users);

  const token = jwt.generateToken(newUser.id);

  response.status(201).json({
    id: newUser.id,
    userName: newUser.userName,
    token,
  });
}
function invalidCredentials(response) {
  return response.status(401).json({ message: "invalid credentials" });
}
async function signIn(request, response) {
  const user = request.body;
  const users = database.getUsers();

  const dbUser = users.find((u) => u.userName === user.userName);
  if (!dbUser) return invalidCredentials(response);

  const passwordIsValid = await bcrypt.compare(user.password, dbUser.password);
  if (!passwordIsValid) return invalidCredentials(response);

  const token = jwt.generateToken(dbUser.id);

  response.status(201).json({
    id: dbUser.id,
    userName: dbUser.userName,
    token,
  });
}

module.exports = {
  signUp,
  signIn,
};
