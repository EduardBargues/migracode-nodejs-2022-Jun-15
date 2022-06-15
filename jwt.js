const jwt = require("jsonwebtoken");
const secret = "this is my secret";

function generateToken(userId) {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

module.exports = { generateToken };
