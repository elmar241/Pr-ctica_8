const pool = require("../config/db");

const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM posts");
    return rows;
};

const getById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM posts WHERE id = ?",
        [id]
    );
    return rows[0];
};

const create = async ({ titulo, descripcion, fecha_creacion, categoria, autor_id }) => {
    const [result] = await pool.query(
        `INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id)
         VALUES (?, ?, ?, ?, ?)`,
        [titulo, descripcion, fecha_creacion, categoria, autor_id]
    );
    return result;
};

module.exports = {
    getAll,
    getById,
    create
};
