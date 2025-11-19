const router = require("express").Router();
const AutoresController = require("../../controllers/authors.controller");

router.get("/", AutoresController.getAllAutores);
router.get("/:id", AutoresController.getAutorById);
router.post("/", AutoresController.createAutor);
router.get("/:id/posts", AutoresController.getPostsByAutor);
router.get("/:id/posts/count", AutoresController.getAutorWithPosts);

module.exports = router;
