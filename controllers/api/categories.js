const { Category, Product } = require("../../models");

// find all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ["id", "product_name", "price", "stock"] }],
    });

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(`[ERROR: Failed to get categories | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

// find one category by its `id` value
const getCategoryById = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to get category by id | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

// create a new category
const createCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to get category by id | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

// update a category by its `id` value
const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to get category by id | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

// delete a category by its `id` value
const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to get category by id | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get categories",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
