const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  let header, token;
  
  // check if user send token via Authorization header or not
  if ( 
    !(header = req.header("Authorization")) || 
    !(token = header.replace("Bearer ", ""))
  ) {
    // rejected request and send response access denied
    return res.status(401).send({ message: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY); //verified token
    req.user = verified;
    next(); // if token valid go to the next request
  } catch (error) {
    // if token not valid send response invalid token
    res.status(400).send({ message: "Invalid token" });
  }
};
