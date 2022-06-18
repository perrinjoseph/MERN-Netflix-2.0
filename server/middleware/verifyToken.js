const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie)
    return res
      .status(403)
      .json({ error: "Cookie does not exist or the token must have expired" });

  const token = cookie.split("=")[1];
  if (!token)
    return res.status(403).json({ error: "Token does not exist in cookie" });
  jwt.verify(token, process.env.CLIENT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Not authorized to view this page." });
    req.user = user;
  });
  next();
};

module.exports = verifyToken;
