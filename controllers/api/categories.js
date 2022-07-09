const { parse } = require("dotenv");

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
    //get id from param arguments
    const { id } = req.params;
    //search database using the id
    const category = await Category.findByPk(id, {
      include: [
        { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: `Failed to find category using the id: ${id}` });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.log(`[ERROR: Failed to get category by id | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to get category",
    });
  }
};

// create a new category
const createCategory = async (req, res) => {
  try {
    //get the category name from the req parameters
    const { category_name } = req.body;
    //search for name in category table
    const searchCategory = await Category.findAll({
      attributes: ["category_name"],
      where: { category_name },
    });

    if (searchCategory.length !== 0) {
      return res.status(200).json({
        message: `Category ${category_name} exists in the database`,
        category: searchCategory,
      });
    }

    //create the category
    const newCategory = await Category.create({ category_name });

    return res.status(200).json({
      message: "A new category has been successfully created",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create category",
    });
  }
};

// update a category by its `id` value
const updateCategory = async (req, res) => {
  try {
    //get id from param arguments
    const { id } = req.params;

    //get the category name form param arg
    const { category_name } = req.body;

    //send request using id
    const category = await Category.findByPk(id);
    //return error if id not found
    if (!category) {
      return res.status(404).json({
        message: `Category ${id} does not exist`,
      });
    }

    //check if category name is valid before request

    if (!category_name) {
      return res.status(400).json({ message: "Please use a valid category name" });
    }
    const updateCategory = await Category.update(
      { category_name },
      {
        where: { id },
      }
    );

    return res.status(200).json({ message: "Category successfully updated" });
  } catch (error) {
    console.log(`[ERROR: Failed to update category | ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to update category",
    });
  }
};

// delete a category by its `id` value
const deleteCategory = async (req, res) => {
  try {
    //get the id from the param arg
    const { id } = req.params;

    //search category using id
    const category = await Category.findByPk(id);

    //check if category exists
    if (!category) {
      return res.status(404).json({
        message: `Category with id ${id} does not exist`,
      });
    }

    //delete the category
    await Category.destroy({ where: { id } });
    return res.status(200).json({ message: `Category with id ${id} has been deleted` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete category using id",
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
