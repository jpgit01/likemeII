import express from 'express'
import cors from 'cors'

import {
  findAll,
  findById,
  create,
  modificarPost,
  deleteById
} from './models/posts.models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

// traer todos los resultados
app.get('/posts', async (__, res) => {
  try {
    const result = await findAll()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (Todo)' })
  }
})

// traer resultados por id
app.get('/posts/:id', async (req, res) => {
  try {
    const result = await findById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
})

// actualizar like
app.put('/posts/like/:id', async (req, res) => {
  try {
    await modificarPost(req.params.id)
    res.status(200).json({ status: true, message: 'dato actualizado' })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).send('Internal Server Error: (actualizar)')
  }
})

// borrar resultados x id
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteById(id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, aclaracion: 'Internal Server Error: delete', message: error })
  }
})

// crear posts
app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body
    const result = await create(titulo, url, descripcion, likes)
    res.status(201).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).send('Internal Server Error: (ingreso)')
  }
})

// manejo de todas las consultas
app.all('*', (__, res) =>
  res.status(404).json({ status: false, message: 'Page not found' })
)

app.listen(PORT, () => console.log('server UP'))

export default app
