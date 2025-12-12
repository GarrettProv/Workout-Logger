const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const [, token] = authHeader.split(" "); // split "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded will be like { userId: "...", iat: ..., exp: ... }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
