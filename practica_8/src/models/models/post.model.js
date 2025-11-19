const AuthorsModel = require("../models/authors.model");

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await AuthorsModel.getAll();
        res.json(authors);
    } catch (error) {
        next(error);
    }
}

const createAuthor = async (req, res, next) => {
    try {
        const { nombre, email, imagen } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({ message: "Nombre and email are required" });
        }

        const result = await AuthorsModel.create({
            nombre,
            email,
            imagen: imagen || null
        });

        res.status(201).json({
            message: "Author created successfully",
            insertId: result.insertId
        });

    } catch (error) {
        next(error);
    }
}

const getPostsByAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await AuthorsModel.getPostsByAuthor(id);
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllAuthors, createAuthor, getPostsByAuthor };
