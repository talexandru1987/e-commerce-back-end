const { Tag, Product, ProductTag } = require("../../models");

// find all tags
const findAllTags = async (req, res) => {
  // be sure to include its associated Product data
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to find all tags| ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to find all tags",
    });
  }
};

// find a single tag by its `id`
const findTag = async (req, res) => {
  // be sure to include its associated Product data
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to find tag| ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to find tag",
    });
  }
};

// create a new tag
const createTag = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to create tag| ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to create tag",
    });
  }
};

// update a tag's name by its `id` value
const updateTag = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to update tag| ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to update tag",
    });
  }
};

// delete on tag by its `id` value
const deleteTag = async (req, res) => {
  try {
  } catch (error) {
    console.log(`[ERROR: Failed to delete tag| ${error.message}]}`);

    return res.status(500).json({
      success: false,
      error: "Failed to delete tag",
    });
  }
};

module.exports = {
  findAllTags,
  findTag,
  createTag,
  updateTag,
  deleteTag,
};
