# Hashing Password with Bcrypt

In this digital era, there is a chance data from application can be stolen and crack. For that reason, every software engineers secure app by hashing user password before store it to database. Hashing password now is very easy, there are many hashing algorithm and the common is bcrypt. 

Bcrypt allows building a password security platform that can evolve alongside hardware technology to guard against the threats that the future may bring, such as attackers having the computing power to crack passwords twice as fast.
 
For a simple example:
```javascript
  const bcrypt = require("bcrypt");
  
  // we generate salt (random value) with 10 rounds
  const salt = await bcrypt.genSalt(10);
  
  // we hash password from client with salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // compare password between original password from client and hashed password from database
  const isMatching = await bcrypt.compare(req.body.password, userExist.password);
});
```

Reference: [Bcrypt](https://www.npmjs.com/package/bcrypt)
