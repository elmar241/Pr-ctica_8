const PostModel = require("../models/post.model");

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.getAll();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await PostModel.getById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;

        if (!titulo || !descripcion || !fecha_creacion || !categoria || !autor_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 1. Crear post
        const result = await PostModel.create({
            titulo,
            descripcion,
            fecha_creacion,
            categoria,
            autor_id
        });

        // 2. Obtener el post recién creado
        const newPost = await PostModel.getById(result.insertId);

        // 3. Devolver mensaje + post
        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost
};
