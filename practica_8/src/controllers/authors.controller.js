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
        const { nombre, email } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({
                message: "Nombre and email are required"
            });
        }

        // 1. Crear autor
        const result = await AuthorsModel.create({ nombre, email });

        // 2. Obtener el autor recién creado
        const newAuthor = await AuthorsModel.getById(result.insertId);

        // 3. Devolver mensaje + datos del autor
        res.status(201).json({
            message: "Author created successfully",
            author: newAuthor
        });

    } catch (error) {
        next(error);
    }
};


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

