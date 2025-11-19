const router = require("express").Router();
const authorsController = require("../../controllers/authors.controller");

// GET Sacar todos los autores
router.get("/", authorsController.getAllAuthors);

// POST crear un autor
router.post("/", authorsController.createAuthor);

// GET Todos los post escritos por un autor concreto
router.get("/:id/posts", authorsController.getPostsByAuthor);

module.exports = router;
