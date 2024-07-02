const jwttoken = require("jsonwebtoken");

const autoriser = (req, res, next) => {
  const token = req.headers.token;
  jwttoken.verify(token, "RandomToken", (err, decoded) => {
    if (err) res.send("there is no token");
    console.log(decoded);
    if (decoded.role === "owner") {
      next();
    } else {
      res.send("u r not authorised");
    }
  });
};
module.exports = autoriser;
