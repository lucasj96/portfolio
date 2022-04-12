import dotenv from 'dotenv'
dotenv.config()

export default {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  BASE_HREF: process.env.BASE_HREF
}
