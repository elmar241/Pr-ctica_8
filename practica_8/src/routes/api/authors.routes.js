const router = require("express").Router();
const { getAllAuthors, createAuthor, getPostsByAuthor } = require("../../controllers/authors.controller");

router.get("/", getAllAuthors);
router.get("/:id/posts", getPostsByAuthor);
router.post("/", createAuthor);

module.exports = router;

