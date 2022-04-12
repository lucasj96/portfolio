import mongoose from 'mongoose'
import config from './config.js'

/**
 * Creates a connection with the database.
 *
 * @returns {Promise} Promise that will resolve or reject based on the connection.
 */
export const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is open.')
  })

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error has occurred: ${err}`)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected')
  })

  return mongoose.connect(config.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
