// Import the necessary dependencies
import puppeteer from 'puppeteer'
import { Scraper } from '../src/controllers/scraper.js' // Assuming the Scraper class is in a separate file
import { jest } from '@jest/globals'

// Mock the Puppeteer launch and newPage functions
jest.mock('puppeteer', () => ({
  __esModule: true,
  default: {
    launch: jest.fn(),
    connect: jest.fn()
    // Add other necessary mock functions
  }
}))

describe('Scraper', () => {
  let scraper
  let page

  beforeEach(() => {
    scraper = new Scraper()
    page = {
      setExtraHTTPHeaders: jest.fn(),
      goto: jest.fn(),
      evaluate: jest.fn()
    }
    puppeteer.launch.mockResolvedValue({
      newPage: jest.fn().mockResolvedValue(page),
      close: jest.fn()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should set extra headers correctly', async () => {
    const url = 'https://example.com'

    await scraper.erikshjalpenSubScraper(url)

    expect(page.setExtraHTTPHeaders).toHaveBeenCalledWith(scraper.headers)
  })
})
