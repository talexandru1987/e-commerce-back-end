const router = require("express").Router();

const {
  findAllTags,
  findTag,
  createTag,
  updateTag,
  deleteTag,
} = require("../../controllers/api/tags");

// The `/api/tags` endpoint

router.get("/", findAllTags);
router.get("/:id", findTag);

router.post("/", createTag);

router.put("/:id", updateTag);

router.delete("/:id", deleteTag);

module.exports = router;
