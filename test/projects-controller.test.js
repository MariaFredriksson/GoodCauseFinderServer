import { ProjectsController } from '../src/controllers/projects-controller.js'
import { jest } from '@jest/globals'

describe('ProjectsController', () => {
  // Define variables that will be used in this test
  let controller
  let mockReq
  let mockRes
  let mockNext

  // Runs before each test case and initializes the variables
  beforeEach(() => {
    // Create a new instance of the project controller
    controller = new ProjectsController()

    mockReq = {}

    // Created to simulate the behavior of a HTTP response object
    mockRes = {
      // Creates a Jest mock function that returns this
      status: jest.fn().mockReturnThis(),

      // Creates a Jest mock function that is used to simulate the json method of the response object
      json: jest.fn()
    }

    // Created to simulate the behavior of an Express middleware or route handler
    // Creates a Jest mock function that can be used to track whether it has been called and with what arguments
    mockNext = jest.fn()
  })

  it('should respond with the data and status 200', async () => {
    // Arrange
    const expectedData = { message: 'Some data' }
    controller.data = expectedData

    // Act
    await controller.index(mockReq, mockRes, mockNext)

    // Assert
    // Checks that the status and json methods of mockRes have been called with the expected data, and that mockNext has not been called
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith(expectedData)
    expect(mockNext).not.toHaveBeenCalled()
  })
})
