# Inpu Validation with Joi

For some security reason, we need to validate input data that comes from client (login or fill form) in our backend. Validation is very important to prevent user make request that doesn’t meet criteria.

For a simple example
```javascript
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});
 
// do validation and get error object from schema.validate
const { error } = schema.validate(req.body);

// if error exist send validation error message
if (error)
  return res.status(400).send({
    error: {
      message: error.details[0].message,
    },
  }); 
}

```

Reference: [Input validation with Joi](https://joi.dev/api/?v=17.4.1#introduction)
