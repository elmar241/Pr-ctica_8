const PostModel = require("../models/post.model");

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.getAll();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;

        if (!titulo || !descripcion || !fecha_creacion || !categoria || !autor_id) {
            return res
                .status(400)
                .json({ message: "All fields are required" });
        }

        const result = await PostModel.create({
            titulo,
            descripcion,
            fecha_creacion,
            categoria,
            autor_id,
        });

        res.status(201).json({
            message: "Post created successfully",
            insertId: result.insertId
        });
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

module.exports = { getAllPosts, createPost, getPostById };
