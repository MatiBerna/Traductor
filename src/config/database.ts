import { Sequelize } from 'sequelize'

export const sequelize: Sequelize = new Sequelize({
  database: 'test_translate',
  dialect: 'mysql',
  username: 'root',
  password: '123456789',
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
