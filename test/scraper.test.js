import puppeteer from 'puppeteer'

describe('Erikshjälpen Scraper', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should find elements with class "entries", "entry", and a-tags with hrefs', async () => {
    const url = 'https://erikshjalpen.se/vad-vi-gor/'
    await page.goto(url)

    // Checks if there are elements on the webpage that have the class name "entries". Within these "entries" elements, it further checks if there are elements with the class name "entry". Inside the "entry" elements, it verifies if there are a-tags with non-empty hrefs.
    const hasEntriesWithEntryAndHrefs = await page.evaluate(() => {
      const entries = Array.from(document.querySelectorAll('.entries'))
      return entries.some(entry => {
        const entryElements = entry.querySelectorAll('.entry')
        return Array.from(entryElements).some(entryElement => {
          const aTags = entryElement.querySelectorAll('a')
          return Array.from(aTags).some(aTag => aTag.href !== '')
        })
      })
    })

    expect(hasEntriesWithEntryAndHrefs).toBe(true)
  })
})
