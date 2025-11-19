const AutoresModel = require("../models/authors.model");

// Obtener todos los autores
const getAllAutores = async (req, res, next) => {
    try {
        const autores = await AutoresModel.getAll();
        res.json(autores);
    } catch (error) {
        next(error);
    }
};

// Obtener autor por ID
const getAutorById = async (req, res, next) => {
    try {
        const autor = await AutoresModel.getById(req.params.id);

        if (!autor) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

        res.json(autor);
    } catch (error) {
        next(error);
    }
};

// Crear autor y devolverlo
const createAutor = async (req, res, next) => {
    try {
        const { nombre, email, imagen } = req.body;

        if (!nombre || !email) {
            return res
                .status(400)
                .json({ message: "Nombre y email son obligatorios" });
        }

        // Crear
        const result = await AutoresModel.create({ nombre, email, imagen });

        // Obtener autor recién creado
        const autorNuevo = await AutoresModel.getById(result.insertId);

        res.status(201).json({
            message: "Autor creado correctamente",
            autor: autorNuevo
        });
    } catch (error) {
        next(error);
    }
};

// Obtener posts completos de un autor
const getPostsByAutor = async (req, res, next) => {
    try {
        const autorId = req.params.id;

        const autor = await AutoresModel.getById(autorId);
        if (!autor) return res.status(404).json({ message: "Autor no encontrado" });

        const posts = await AutoresModel.getPostsByAuthor(autorId);

        res.json({ autor, posts });
    } catch (error) {
        next(error);
    }
};

// Obtener AUTOR + TODOS sus posts (antes solo devolvía recuento)
const getAutorWithPosts = async (req, res, next) => {
    try {
        const autorId = req.params.id;

        // 1. Datos del autor
        const autor = await AutoresModel.getById(autorId);
        if (!autor) return res.status(404).json({ message: "Autor no encontrado" });

        // 2. Posts completos
        const posts = await AutoresModel.getPostsByAuthor(autorId);

        // 3. Respuesta completa
        res.json({
            autor,
            posts
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    getPostsByAutor,
    getAutorWithPosts
};
