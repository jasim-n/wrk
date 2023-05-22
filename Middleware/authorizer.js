const jwt = require("jsonwebtoken");
async function auth(req, res, next) {
  let token = req.headers.authorization;
  console.log(req.headers.authorization)
  if (!token) return res.status(400).send("Token Not Provided");
  try {
    let check = jwt.verify(token,'key' );
    console.log(check)
   
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}
module.exports = auth;