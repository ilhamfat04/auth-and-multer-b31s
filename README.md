# Authentication with JWT

According to official documentation, JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.  

This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

For a simple example:
```javascript
const jwt = require("jsonwebtoken")
// generate token when register or login
const token = jwt.sign(payload, "YOUR-SECRET-KEY");

// in the auth middleware
try {
    const verified = jwt.verify(token, "YOUR-SECRET-KEY"); //verified token
    req.user = verified;
    next(); // if token valid go to the next request
  } catch (error) {
    // if token not valid send response invalid token
    res.status(400).send({ message: "Invalid token" });
}
```

Reference: [Json Web Token Implementation](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)
