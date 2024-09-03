import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

export const sequelize: Sequelize = new Sequelize({
  database: 'test_translate',
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 3307,
})

export const startDb = async () => {
  try {
    await sequelize.sync()
    console.log('Base de datos sincronizada')
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error)
  }
}
