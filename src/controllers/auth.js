// import model here
const { user } = require('../../models')

// import package here
const Joi = require('joi');

exports.register = async (req, res) => {
  // code here
  try {
    const data = req.body

    // blueprint ketentuan 
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
      status: Joi.string().required(),
    })

    //cek data dengan ketentuan
    const { error } = schema.validate(data)

    if (error) {
      return res.status(400).send({
        status: "error",
        message: error.details[0].message,
      })
    }

    const newUser = await user.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    res.status(201).send({
      status: "success",
      data: {
        name: newUser.name,
        password: newUser.password
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // code here
  try {
    const data = req.body

    // blueprint ketentuan 
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required()
    })

    //cek data dengan ketentuan
    const { error } = schema.validate(data)

    if (error) {
      return res.status(400).send({
        status: "error",
        message: error.details[0].message,
      })
    }

    const userExist = await user.findOne({
      where: {
        email: data.email,
        password: data.password
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      })
    }

    res.status(200).send({
      status: 'success',
      data: {
        name: userExist.name,
        email: userExist.email
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
