const pool = require("../config/db");

const getAll = async () => {
    const [rows] = await pool.query(`
        SELECT id, nombre, email, imagen, creado_en
        FROM autores
        ORDER BY id DESC
    `);
    return rows;
}

const create = async ({ nombre, email, imagen }) => {
    const [result] = await pool.query(
        `
        INSERT INTO autores (nombre, email, imagen)
        VALUES (?, ?, ?)
        `,
        [nombre, email, imagen || null]
    );
    return result;
}

const getPostsByAuthor = async (authorId) => {
    const [rows] = await pool.query(
        `
        SELECT 
            p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
            a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
        FROM posts p
        JOIN autores a ON p.autor_id = a.id
        WHERE a.id = ?
        ORDER BY p.id DESC
        `,
        [authorId]
    );
    return rows;
}

module.exports = { getAll, create, getPostsByAuthor };

