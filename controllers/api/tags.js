const { Tag, Product, ProductTag } = require("../../models");

// find all tags
const findAllTags = async (req, res) => {
  // be sure to include its associated Product data
  try {
    //get all the tags
    const allTags = await Tag.findAll({
      include: [
        { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] },
      ],
    });

    //check if the tags table is empty
    if (!allTags) {
      return res.status(404).json({
        error: "There are no tags in the table",
      });
    }
    //return the results
    return res.status(200).json(allTags);
  } catch (error) {
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
    //get the id from the param arg
    const { id } = req.params;

    //search the table using id
    const tag = await Tag.findByPk(id, {
      include: [
        { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] },
      ],
    });

    //check  if tag exists in the table
    if (!tag) {
      return res.status(404).json({ message: `The tag with the id ${id} has not been found` });
    }

    //return the response
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to find tag using the provided id",
    });
  }
};

// create a new tag
const createTag = async (req, res) => {
  try {
    //get the tag name from the param arg
    const { tag_name } = req.body;
    //check if the tag is not empty
    if (!tag_name) {
      return res.status(400).json({ message: "Please provide a valid tag" });
    }

    //search for tag name in tag table
    const searchTag = await Tag.findAll({
      attributes: ["tag_name"],
      where: { tag_name },
    });

    //stop duplicate tags
    if (searchTag.length !== 0) {
      return res.status(200).json({
        message: `Tag ${tag_name} exists in the database`,
        category: searchTag,
      });
    }

    //create the tag
    const newTag = await Tag.create({ tag_name });

    //return the response
    return res.status(200).json({ message: "Tag has been successfully created", tag: newTag });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create tag",
    });
  }
};

// update a tag's name by its `id` value
const updateTag = async (req, res) => {
  try {
    //get the param arg
    const { id } = req.params;
    const { tag_name } = req.body;
    //check if a valid tag was provided
    if (!tag_name) {
      return res.status(400).json({ message: "Please provide a valid tag" });
    }
    //search the table using the id
    const tag = await Tag.findByPk(id);

    //check if tag found
    if (!tag) {
      return res.status(404).json({
        message: `Tag with id ${id} does not exist`,
      });
    }

    //search for the tag
    await Tag.update(
      { tag_name },
      {
        where: { id },
      }
    );

    //return the results
    return res.status(200).json({ message: "Tag has been updated" });
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
    //get param arg
    const { id } = req.params;

    //find the tag by id
    const tag = await Tag.findByPk(id);

    //check if tag exists
    if (!tag) {
      return res.status(404).json({
        message: `The tag with id ${id} does not exist`,
      });
    }

    //delete the tag
    await Tag.destroy({ where: { id } });

    //return the results
    return res.status(200).json({ message: `The tag with id ${id} has been deleted` });
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
