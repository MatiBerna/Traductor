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

app.post('/traducciones', async (req, res) => {
  let offset = 0
  const limit = 10
  let translatedTraducciones: Traduction[] = []
  let traducciones: Traduction[] = []

  do {
    traducciones = await Traduction.findAll({
      where: { language: 'english' },
      limit,
      offset,
    })

    const textsToTranslate = traducciones.map((traduction) => traduction.text).join('---')
    const translationResult = await translate(textsToTranslate, 'en', 'es')
    const translatedTexts = translationResult!.translation.split('---')

    const translatedTraduccionesBatch = translatedTexts.map(async (translatedText, index) => {
      const traduction = traducciones[index]
      if (translatedText) {
        try {
          const existingTraduction = await Traduction.findOne({
            where: {
              id: traduction.id,
              language: 'español',
            },
          })

          if (existingTraduction) {
            return existingTraduction
          } else {
            const newTraduction = await Traduction.create({
              id: traduction.id,
              text: translatedText,
              language: 'español',
            })
            return newTraduction
          }
        } catch (error) {
          console.log(error)
        }
      }
      return traduction
    })

    const resolvedBatch = await Promise.all(translatedTraduccionesBatch)
    translatedTraducciones = translatedTraducciones.concat(resolvedBatch)

    offset += limit
  } while (traducciones.length === limit)

  res.json(translatedTraducciones)
})

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
  console.log(process.env.DB_USER)
  startDb()
})
