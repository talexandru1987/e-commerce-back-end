const { Product, Category, Tag, ProductTag } = require("../../models");

// find all products
const findAllProducts = async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    //find all the products
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    //check if there are any products
    if (!allProducts) {
      return res.status(404).json({
        error: "There are no products in the table",
      });
    }

    //return product if successful
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to find all products",
    });
  }
};

// find a single product by its `id`
const findSingleProduct = async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    //get the product id
    const { id } = req.params;
    //search for product id in table
    const product = await Product.findByPk(id, {
      include: [{ model: Category }, { model: Tag }],
    });

    //check if product id exists
    if (!product) {
      return res.status(404).json({ message: `The Product with id ${id} has not been found` });
    }

    //return the results
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to find a product using the specified id",
    });
  }
};

//create a product
const createNewProduct = (req, res) => {
  /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

// update product by id
const updateProduct = async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
};

//delete product
const deleteProduct = async (req, res) => {
  // delete one product by its `id` value
  try {
    //get the id from param arg
    const { id } = req.params;
    //find all products using id
    const product = await Product.findByPk(id);

    //check if product exists
    if (!product) {
      return res.status(404).json({
        message: `Product with the id ${id} thus not exist in the table`,
      });
    }
    // delete the product
    await Product.destroy({ where: { id } });
    return res.status(200).json({ message: `Product with id ${id}  has been deleted` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete product",
    });
  }
};

module.exports = {
  findAllProducts,
  findSingleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
