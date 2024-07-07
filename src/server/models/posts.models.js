import db from '../database/db_connect.js'
import 'dotenv/config'

export const findAll = async () => await db('SELECT * FROM posts;')

export const findById = async (id) => await db('SELECT * FROM posts WHERE id = $1;', [id])

export const create = async (titulo, url, descripcion) => await db('INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (default, $1, $2, $3, 0) RETURNING *;', [titulo, url, descripcion])

export const modificarPost = async (id) => await db('UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;', [id])

export const deleteById = async (id) => await db('DELETE FROM posts wHERE id = $1 RETURNING *;', [id])
