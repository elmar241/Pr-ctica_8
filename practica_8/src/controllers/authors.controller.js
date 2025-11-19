const AuthorsModel = require("../models/authors.model");

// Obtener todos los autores
const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await AuthorsModel.getAll();
        res.json(authors);
    } catch (error) {
        next(error);
    }
};

// Obtener autor por ID
const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await AuthorsModel.getById(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(author);
    } catch (error) {
        next(error);
    }
};

// Crear autor y devolverlo
const createAuthor = async (req, res, next) => {
    try {
        const { nombre, email } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({
                message: "Nombre and email are required"
            });
        }

        // Crear autor
        const result = await AuthorsModel.create({ nombre, email });

        // Obtener autor recién creado
        const newAuthor = await AuthorsModel.getById(result.insertId);

        res.status(201).json({
            message: "Author created successfully",
            author: newAuthor
        });

    } catch (error) {
        next(error);
    }
};

// Obtener todos los posts de un autor
const getPostsByAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        const posts = await AuthorsModel.getPostsByAuthor(id);

        res.json(posts);
    } catch (error) {
        next(error);
    }
};

// Obtener cantidad de posts de un autor
const getPostCountByAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        const count = await AuthorsModel.getPostCount(id);

        res.json({
            author_id: id,
            total_posts: count.total
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    getPostsByAuthor,
    getPostCountByAuthor
};
