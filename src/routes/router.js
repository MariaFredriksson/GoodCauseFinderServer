/**
 * The routes.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import express from 'express'
import { router as projectsRouter } from './projects-router.js'

export const router = express.Router()

router.use('/projects', projectsRouter)

// If any url is requested that doesn't match the above, there will be an error
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')

  error.status = 404

  // Sends the error to the the next middleware, which will trigger the error handler
  next(error)
})
