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

// Crear autor
const create = async ({ nombre, email, imagen }) => {
    const [result] = await pool.query(
        `INSERT INTO autores (nombre, email, imagen)
         VALUES (?, ?, ?)`,
        [nombre, email, imagen]
    );
    return result;
};

// Obtener posts de un autor
const getPostsByAuthor = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM posts WHERE autor_id = ?",
        [id]
    );
    return rows;
};

module.exports = {
    getAll,
    getById,
    create,
    getPostsByAuthor
};
