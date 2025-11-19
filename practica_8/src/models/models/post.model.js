const pool = require("../config/db");

module.exports = {
    // Obtener todos los posts con datos del autor
    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT 
                p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, 
                a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
            FROM posts p
            JOIN autores a ON p.autor_id = a.id
            ORDER BY p.id DESC
        `);

        return rows;
    },

    // Crear un nuevo post
    create: async (postData) => {
        const { titulo, descripcion, fecha_creacion, categoria, autor_id } = postData;

        const [result] = await pool.query(
            `
            INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id)
            VALUES (?, ?, ?, ?, ?)
            `,
            [titulo, descripcion, fecha_creacion, categoria, autor_id]
        );

        return result;
    },

    // Obtener un post por ID con datos del autor
    getById: async (id) => {
        const [rows] = await pool.query(
            `
            SELECT 
                p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria, 
                a.id AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
            FROM posts p
            JOIN autores a ON p.autor_id = a.id
            WHERE p.id = ?
            `,
            [id]
        );

        return rows[0]; 
    }
};
