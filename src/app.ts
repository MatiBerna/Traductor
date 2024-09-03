import express from 'express'
import { startDb } from './config/database'
import { Traduction } from './models/Traduction'
import { translate } from 'bing-translate-api'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})

app.get('/traducciones', async (req, res) => {
  const traducciones = await Traduction.findAll()

  const translatedTraducciones = await Promise.all(
    traducciones.map(async (traduction) => {
      const result = await translate(traduction.text, 'en', 'es')
      if (result) {
        const newTraduction = await Traduction.create({
          id: traduction.id,
          text: result.translation,
          language: 'español',
        })
        return newTraduction
      }
      return traduction
    })
  )

  res.json(translatedTraducciones)
})

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
  startDb()
})
