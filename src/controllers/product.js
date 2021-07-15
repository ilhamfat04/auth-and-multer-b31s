const { product, user, category, productCategory } = require("../../models");

exports.getProduct = async (req, res) => {
  try {
    const data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { category: categoryName, ...data } = req.body;

    const newProduct = await product.create({
      ...data,
      image: req.file.filename, // image that passed from middleware will in the req.file 
      idUser: req.user.id, // got from authentication middleware

    });
    const categoryData = await category.findOne({
      where: {
        name: categoryName,
      },
    });

    if (categoryData) {
      await productCategory.create({
        idCategory: categoryData.id,
        idProduct: newProduct.id,
      });
    } else {
      const newCategory = await category.create({ name: categoryName });
      await productCategory.create({
        idCategory: newCategory.id,
        idProduct: newProduct.id,
      });
    }
    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    productData = JSON.parse(JSON.stringify(productData))

    res.send({
      status: "success...",
      data: {
        ...productData,
        image: 'http://localhost:5000/uploads/' + productData.image
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
