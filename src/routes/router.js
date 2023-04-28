/**
 * The routes.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as projectsRouter } from './projects-router.js'
// import { router as snippetsRouter } from './snippets-router.js'
// import { router as usersRouter } from './users-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/projects', projectsRouter)
// router.use('/snippets', snippetsRouter)
// router.use('/users', usersRouter)

// If any url is requested that doesn't match the above, there will be an error
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')

  // TODO: set another status code
  // error.status = 404

  // Sends the error to the the next middleware, which will trigger the error handler
  next(error)
})
