import express from 'express'
import hbs from 'express-hbs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import helmet from 'helmet'
import http from 'http'
import logger from 'morgan'
import { router } from './routes/routes.js'

/**
 * The main method of the server.
 */
const main = async () => {
  const PORT = process.env.PORT || 5002
  const app = express()
  const server = http.createServer(app)
  const io = new Server(server)

  const directoryName = dirname(fileURLToPath(import.meta.url))

  io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })

  app.set('view engine', 'hbs')
  app.set('views', join(directoryName, 'views'))
  app.engine('hbs', hbs.express4({
    defaultLayout: join(directoryName, 'views', 'layouts', 'default'),
    partialsDir: join(directoryName, 'views', 'partials')
  }))
  app.use(express.static(join(directoryName, '..', 'public')))

  app.use(helmet())
  app.use(helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'],
      'img-src': ["'self'", 'secure.gravatar.com']
    }
  }))

  app.use(logger('dev'))

  app.use((req, res, next) => {
    res.io = io
    next()
  })

  app.use((req, res, next) => {
    res.locals.baseURL = '/issues-app/'
    next()
  })
  app.use(express.json())

  // Routes
  app.use('/', router)

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

main()
