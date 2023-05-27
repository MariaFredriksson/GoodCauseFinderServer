/**
 * The starting point of the application.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import cron from 'node-cron'
import express from 'express'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import helmet from 'helmet'
import cors from 'cors'
import { Scraper } from './scrapers/scraper.js'

try {
  // Connect to MongoDB.
  await connectDB()

  // Creates an Express application.
  const expressApp = express()

  // Use cors, so that the API can be accessed from where I want to use it
  expressApp.use(cors({
    origin: 'http://localhost:3000'
  }))

  expressApp.use(helmet())

  expressApp.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'http://cscloud7-221.lnu.se', 'https://cscloud7-221.lnu.se']
      }
    })
  )

  // Set up a morgan logger using the dev format for log entries.
  // The 'dev' format is a predefined string that stands for :method :url :status :response-time ms - :res[content-length]
  expressApp.use(logger('dev'))

  // If the app is in production, extra layers of security are added
  if (expressApp.get('env') === 'production') {
    // Shows that this express application is run behind a reverse proxy, and which proxy that is trusted
    expressApp.set('trust proxy', 1) // trust first proxy
  }

  // Register routes.
  // The app.use() method is used to register middleware functions or objects with the Express application. The first argument passed to the app.use() method is the path that the middleware function or object should handle. In this case, the path is /, which means that the middleware function or object should handle all requests to the root path of the application.
  // router is the middleware object
  expressApp.use('/', router)

  // Error handler middleware.
  // Good that this is placed at the end of the middleware chain, so this handler can take care of the errors that are not caught in the other middlewares or routes
  // By logging the error and sending an appropriate error response, you ensure that the server doesn't crash or hang in case of errors and that the client receives a clear indication of what went wrong.
  expressApp.use(function (err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err)

    // Send an appropriate response to the client
    res.status(err.status || 500).send('Internal Server Error')
  })

  // Starts the HTTP server listening for connections.
  // This line of code starts the web server and makes it listen on the specified port, so that it can start processing incoming requests and sending back responses. This is the final step in the process of setting up the server and starting the application.
  expressApp.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })

  // Set up the cron job after starting the server, to ensure that the server is running before the cron job is started
  // The cron job is scheduled to run every Saturday at 14:15
  cron.schedule('15 14 * * 6', () => {
  // When one wants to test the cron scheduler, one can uncomment the line below, set the time and day to the current time and day (+ maybe 1-2 minutes), and comment out the line above
  // cron.schedule('37 18 * * 6', () => {
    //
    console.log('Scraping started. Scraping organizations: Erikshjälpen, Läkarmissionen, Svenska Röda Korset')

    const scraper = new Scraper()

    // When one wants to just test one of the scrapers, one can uncomment the line below and comment out the other scrapers
    // scraper.erikshjalpenArticleScraper('https://erikshjalpen.se/barns-ratt-utb-fritid/flickors-ratt-till-utbildning/')

    // If an error occurs in any of the scrapers, it will be caught within the respective .catch() block.
    // The error message, along with the name of the scraper function where the error occurred, will be logged to the console.
    // The other scrapers will continue executing, and the cron job will complete its execution without stopping the server or terminating the entire process.
    scraper.erikshjalpenScraper('https://erikshjalpen.se/vad-vi-gor/')
      .catch((error) => {
        console.error('Error occurred in erikshjalpenScraper:', error)
      })
    scraper.lakarmissionenScraper('https://www.lakarmissionen.se/gavoshop/')
      .catch((error) => {
        console.error('Error occurred in lakarmissionenScraper:', error)
      })
    scraper.rodaKorsetScraper('https://www.rodakorset.se/stod-oss/gavoshop/')
      .catch((error) => {
        console.error('Error occurred in rodaKorsetScraper:', error)
      })

    console.log('Scraping finished')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
