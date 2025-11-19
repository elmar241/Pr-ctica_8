const router = require("express").Router();
const AuthorsController = require("../../controllers/authors.controller");

router.get("/", AuthorsController.getAllAuthors);
router.get("/:id", AuthorsController.getAuthorById);
router.post("/", AuthorsController.createAuthor);
router.get("/:id/posts", AuthorsController.getPostsByAuthor);
router.get("/:id/posts/count", AuthorsController.getPostCountByAuthor);

module.exports = router;


