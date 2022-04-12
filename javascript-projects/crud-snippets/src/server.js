import express from 'express'
import hbs from 'express-hbs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'
import helmet from 'helmet'
import config from './config/config.js'
import { connectDB } from './config/mongoose.js'
import { router } from './routes/routes.js'

/**
 * The starting point of the app.
 * General configurations of the web-server.
 */
const main = async () => {
  const PORT = process.env.PORT || 5001
  const app = express()
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  try {
    await connectDB()
  } catch (error) {
    console.log(`Error main on connectDB: ${error}`)
  }

  app.engine('hbs', hbs.express4({
    defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
    partialsDir: join(directoryFullName, 'views', 'partials')
  }))
  app.set('view engine', 'hbs')
  app.set('views', join(directoryFullName, 'views'))

  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(join(directoryFullName, '..', 'public')))

  app.use(helmet())

  // Allows the following external scripts
  app.use(helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", 'cdn.jsdelivr.net', 'unpkg.com']
    }
  }))

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 // Sessions last 1 day
    },
    rolling: true // Max age is refreshed on visit
  }))

  // Middleware
  app.use((req, res, next) => {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }
    next()
  })

  app.use('/', router)

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${config.BASE_HREF}`)
  })
}

main()
