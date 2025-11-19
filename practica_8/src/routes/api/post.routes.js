const router = require("express").Router();
const postController = require("../../controllers/post.controller");

// GET Posts con datos completos del autor
router.get("/", postController.getAllPosts);

// POST crear un nuevo post
router.post("/", postController.createPost);

// GET post por ID (incluyendo datos del autor)
router.get("/:id", postController.getPostById);

module.exports = router;
