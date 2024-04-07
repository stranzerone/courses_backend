const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "sahil", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.type = user.user;
    next();
  });
};

exports.authenticateTokenAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "sahil", (err, user) => {
    if (err) return res.sendStatus(403);
    
    if (user.user === "admin") {
      req.user = user;
      req.type = "admin";
      next();
    } else {
      res.status(303).json("You Are not Admin");
    }
  });
};
