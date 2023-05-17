
// Import puppeteer for scraping dynamic websites.
import puppeteer from 'puppeteer'

/**
 * A class that represents a general scraper for extracting elements from a webpage.
 */
export class Scraper {
  /**
   * Scrapes a webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async erikshjalpenArticleScraper (url) {
    // Launch a new browser instance.
    const browser = await puppeteer.launch()

    // Create a new page.
    const page = await browser.newPage()

    // Navigate to the page of the url.
    await page.goto(url)

    // Get the article by getting the title, image URL and text from the page.
    // Pass url as an argument
    const article = await page.evaluate((url) => {
      const articleContent = document.querySelector('#content .main-content')

      // Split the URL by "/"
      const parts = url.split('/')
      // Get the second-to-last part of the URL
      const urlId = parts[parts.length - 2]

      return {
        title: articleContent.querySelector('h1').innerText,
        imgURL: articleContent.querySelector('.featured_image img').src,
        organization: 'Erikshjälpen',
        text: articleContent.querySelector('.entry-content').innerText,
        // .replace(/\n/g, ' ')
        articleURL: url,
        id: urlId
      }
      // Pass url as an argument when calling page.evaluate
    }, url)

    // console.log(text)
    console.log(article)

    // Close the browser.
    await browser.close()

    return article
  }

  /**
   * Scrapes a Erikshjälpen subpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @returns {Array} An array of articles.
   */
  async erikshjalpenSubScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // Look for the element with the class name postlist and get all the hrefs from all the a-tags inside it
    const subHrefs = await page.evaluate(() => {
      const aTags = document.querySelectorAll('.postlist a')
      return Array.from(aTags).map(aTag => aTag.href)
    })

    console.log(subHrefs)

    const articles = []

    // Loop through the hrefs and scrape each article and push it to the articles array
    for (const href of subHrefs) {
      const article = await this.erikshjalpenArticleScraper(href)
      articles.push(article)
    }

    console.log(articles)

    await browser.close()

    return articles
  }

  /**
   * Scrapes a Erikshjälpen webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async erikshjalpenScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // Look for the element with the class name entries, and inside it all the divs with the class name entry
    // Loop though all these divs, and get the hrefs from all the a-tags inside them
    const hrefs = await page.evaluate(() => {
      const entries = document.querySelectorAll('.entries .entry')
      return Array.from(entries).map(entry => {
        const aTag = entry.querySelector('a')
        return aTag.href
      })
    })

    console.log(hrefs)

    const articles = []

    // Loop through the hrefs and go to each page, and get the articles from each page, and add them to the articles array
    for (const href of hrefs) {
      const subArticles = await this.erikshjalpenSubScraper(href)

      // Merge the subArticles array with the articles array, using the spread operator
      articles.push(...subArticles)
    }

    console.log(articles)

    await browser.close()
  }
}
