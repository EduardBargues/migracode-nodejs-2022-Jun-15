const jwt = require("jsonwebtoken");
const secret = "this is my secret";

function authenticate(req, res, next) {
  let token = req.header("authorization");
  if (!token) return res.status(403).send({ message: "authorization denied" });

  token = token.split(" ")[1];

  try {
    const verify = jwt.verify(token, secret);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).send({ message: "Token is not valid" });
  }
}

module.exports = { authenticate };
