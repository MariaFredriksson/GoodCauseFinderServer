import request from 'supertest'
import { router } from '../src/routes/projects-router.js'
import { ProjectsController } from '../src/controllers/projects-controller.js'
import express from 'express'

// Mocking the ProjectsController
jest.mock('../controllers/projects-controller.js', () => ({
  ProjectsController: jest.fn().mockImplementation(() => ({
    index: jest.fn(),
    getOneProject: jest.fn()
  }))
}))

describe('Projects Routes', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use('/', router)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the index method when GET / is requested', async () => {
    const controller = new ProjectsController()
    const indexSpy = jest.spyOn(controller, 'index')

    await request(app).get('/')

    expect(indexSpy).toHaveBeenCalled()
  })

  it('should call the getOneProject method when GET /:id is requested', async () => {
    const controller = new ProjectsController()
    const getOneProjectSpy = jest.spyOn(controller, 'getOneProject')

    await request(app).get('/123')

    expect(getOneProjectSpy).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '123' } }))
  })
})
