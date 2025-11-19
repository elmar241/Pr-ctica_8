const pool = require("../config/db");

// Obtener todos los autores
const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM autores");
    return rows;
};

// Obtener autor por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM autores WHERE id = ?",
        [id]
    );
    return rows[0];
};

// Crear un autor
const create = async ({ nombre, email }) => {
    const [result] = await pool.query(
        "INSERT INTO autores (nombre, email) VALUES (?, ?)",
        [nombre, email]
    );
    return result;
};

// Obtener todos los posts de un autor
const getPostsByAuthor = async (authorId) => {
    const [rows] = await pool.query(
        "SELECT * FROM posts WHERE autor_id = ?",
        [authorId]
    );
    return rows;
};

// Obtener cantidad de posts de un autor
const getPostCount = async (authorId) => {
    const [rows] = await pool.query(
        `SELECT COUNT(*) AS total
         FROM posts
         WHERE autor_id = ?`,
        [authorId]
    );
    return rows[0];
};

module.exports = {
    getAll,
    getById,
    create,
    getPostsByAuthor,
    getPostCount
};
