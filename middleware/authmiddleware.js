const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
 
const t1 = req.headers.authorization.split(' ')


const token = t1[1]


  if (token == null) return res.sendStatus(401);

const tt = jwt.decode(token)


  jwt.verify(token,"sahil", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.type = tt;
    next();
  });

};



exports.authenticateTokenAdmin = (req, res, next) => {
 
const t1 = req.headers.authorization.split(' ')


const token = t1[1]


  if (token == null) return res.sendStatus(401);

const tt = jwt.decode(token)


  jwt.verify(token,"sahil", (err, user) => {
  
    req.user = user;

    if(tt.user ==="admin"){
      req.type="admin"
      next();

    }else{
      res.status(303).json("You Are not Admin")
    }
  });

};

