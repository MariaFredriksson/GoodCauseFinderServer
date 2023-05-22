// import { ProjectsController } from '../src/controllers/projects-controller.js'
// import { jest } from '@jest/globals'

// describe('ProjectsController', () => {
//   // Define variables that will be used in this test
//   let controller
//   let mockReq
//   let mockRes
//   let mockNext

//   // Runs before each test case and initializes the variables
//   beforeEach(() => {
//     // Create a new instance of the project controller
//     controller = new ProjectsController()

//     mockReq = {}

//     // Created to simulate the behavior of a HTTP response object
//     mockRes = {
//       // Creates a Jest mock function that returns this
//       status: jest.fn().mockReturnThis(),

//       // Creates a Jest mock function that is used to simulate the json method of the response object
//       json: jest.fn()
//     }

//     // Created to simulate the behavior of an Express middleware or route handler
//     // Creates a Jest mock function that can be used to track whether it has been called and with what arguments
//     mockNext = jest.fn()
//   })

//   it('should respond with the data and status 200', async () => {
//     // Arrange
//     const expectedData = { message: 'Some data' }
//     controller.data = expectedData

//     // Act
//     await controller.index(mockReq, mockRes, mockNext)

//     // Assert
//     // Checks that the status and json methods of mockRes have been called with the expected data, and that mockNext has not been called
//     expect(mockRes.status).toHaveBeenCalledWith(200)
//     expect(mockRes.json).toHaveBeenCalledWith(expectedData)
//     expect(mockNext).not.toHaveBeenCalled()
//   }, 30000)
// })

// const { ProjectsController } = require('./ProjectsController')
// const Project = require('./Project')
import { ProjectsController } from '../src/controllers/projects-controller.js'
import { Project } from '../src/models/project.js'
import { jest } from '@jest/globals'

// describe('ProjectsController', () => {
//   describe('index', () => {
//     it('should return all projects as JSON', async () => {
//       // Mock the necessary dependencies
//       const projects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }]
//       const findMock = jest.spyOn(Project, 'find').mockResolvedValue(projects)
//       const toObjectMock = jest.spyOn(projects[0], 'toObject').mockReturnValue(projects[0])

//       // Mock the Express response object
//       const jsonMock = jest.fn()
//       const res = { status: jest.fn(() => ({ json: jsonMock })) }

//       // Call the index method
//       await ProjectsController.index({}, res, jest.fn())

//       // Verify the expected behavior
//       expect(res.status).toHaveBeenCalledWith(200)
//       expect(jsonMock).toHaveBeenCalledWith({ projects: [projects[0]] })
//       expect(findMock).toHaveBeenCalled()
//       expect(toObjectMock).toHaveBeenCalledWith()

//       // Restore the original implementations
//       findMock.mockRestore()
//       toObjectMock.mockRestore()
//     })

//     it('should call the next middleware function on error', async () => {
//       // Mock the necessary dependencies to simulate an error
//       const error = new Error('Database error')
//       const findMock = jest.spyOn(Project, 'find').mockRejectedValue(error)

//       // Mock the Express response object and the next middleware function
//       const nextMock = jest.fn()
//       const res = {}

//       // Call the index method
//       await ProjectsController.index({}, res, nextMock)

//       // Verify the expected behavior
//       expect(nextMock).toHaveBeenCalledWith(error)

//       // Restore the original implementation
//       findMock.mockRestore()
//     })
//   })
// })

describe('ProjectsController', () => {
  describe('index', () => {
    it('should return all projects as JSON', async () => {
      const projects = [
        {
          title: 'Project 1',
          imgURL: 'https://example.com/image1.jpg',
          organization: 'Organization 1',
          text: 'Project description 1',
          articleURL: 'https://example.com/article1',
          id: '1'
        },
        {
          title: 'Project 2',
          imgURL: 'https://example.com/image2.jpg',
          organization: 'Organization 2',
          text: 'Project description 2',
          articleURL: 'https://example.com/article2',
          id: '2'
        }
      ]

      const findMock = jest.spyOn(Project, 'find').mockResolvedValue(projects)

      const jsonMock = jest.fn()
      const res = { status: jest.fn(() => ({ json: jsonMock })) }

      await ProjectsController.index({}, res, jest.fn())

      expect(res.status).toHaveBeenCalledWith(200)
      expect(jsonMock).toHaveBeenCalledWith({ projects })
      expect(findMock).toHaveBeenCalled()

      findMock.mockRestore()
    })

    it('should call the next middleware function on error', async () => {
      const error = new Error('Database error')
      const findMock = jest.spyOn(Project, 'find').mockRejectedValue(error)

      const nextMock = jest.fn()
      const res = {}

      await ProjectsController.index({}, res, nextMock)

      expect(nextMock).toHaveBeenCalledWith(error)

      findMock.mockRestore()
    })
  })
})
