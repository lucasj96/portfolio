import dotenv from 'dotenv'
dotenv.config()

export default {
  BASE_URL: process.env.BASE_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  WEBHOOK_TOKEN: process.env.WEBHOOK_TOKEN
}
