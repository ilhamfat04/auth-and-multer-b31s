# Sequelize BelongsToMany

`belongsToMany()` is the special method for define many-to-many association. This method means that many data in model (the source) has relation to many data in another model (the target).  


For example in our database, many data product has relation to many data category in association. To apply this, we need "bridge" table to store foreignKey, in this case productCategory. So, we can define the association in product model as follows:  

```javascript
product.belongsToMany(models.category, {
  as: "categories",
  // through is required in this association
  through: {
    model: "productCategory", // this is "bridge" table
    as: "bridge",
  },
  foreignKey: "idProduct",
});
```

Reference: [Sequelize belongsToMany](https://sequelize.org/master/class/lib/associations/belongs-to-many.js~BelongsToMany.html)
