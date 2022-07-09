const router = require("express").Router();

const {
  findAllProducts,
  findSingleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/api/products");

// The `/api/products` endpoint

// get all products
router.get("/", findAllProducts);

// get one product
router.get("/:id", findSingleProduct);

// create new product
router.post("/", createNewProduct);

// update product
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
