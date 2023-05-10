
import { JSDOM } from 'jsdom'

// Import puppeteer for scraping dynamic websites.
import puppeteer from 'puppeteer'

/**
 * A class that represents a general scraper for extracting elements from a webpage.
 */
export class Scraper {
  /**
   * Extracts elements from a webpage.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @param {string} elementName - The name of the element to extract (e.g. 'a', 'div').
   * @param {object} ifAnyOptions - An optional options object that can be passed to the fetch function.
   *
   * @returns {Promise} A promise of an array of HTML elements.
   */
  async extractElements (url, elementName, ifAnyOptions) {
    const htmlText = await this.getHtmlText(url, ifAnyOptions)

    const dom = new JSDOM(htmlText)

    return Array.from(dom.window.document.querySelectorAll(elementName))
  }

  /**
   * Retrieves the HTML text of a webpage.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @param {object} ifAnyOptions - An optional options object that can be passed to the fetch function.
   *
   * @returns {Promise} A promise of the HTML text of the webpage.
   */
  async getHtmlText (url, ifAnyOptions) {
    const response = await fetch(url, ifAnyOptions)

    if (!response.ok) {
      throw new Error(`Could not fetch. Status: ${response.status}`)
    }

    return response.text()
  }

  /**
   * Scrapes a webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async EHarticleScraper (url) {
    // Launch a new browser instance.
    const browser = await puppeteer.launch()

    // Create a new page.
    const page = await browser.newPage()

    // Navigate to the page of the url.
    await page.goto(url)

    // Get the header from its XPath.
    // Destructure the array to pull out the first element.
    // const [header] = await page.$x('//*[@id="post-36680"]/header/h1')

    // const text = await page.evaluate(() => document.body.innerText)

    // const article = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll('#content .main-content'), (e) => ({
    //     title: e.querySelector('h1').innerText,
    //     imgURL: e.querySelector('.featured_image img').src,
    //     text: e.querySelector('.entry-content').innerText
    //   })
    //   )
    // )

    // Get the article by getting the title, image URL and text from the page.
    const article = await page.evaluate(() => {
      const articleContent = document.querySelector('#content .main-content')
      return {
        title: articleContent.querySelector('h1').innerText,
        imgURL: articleContent.querySelector('.featured_image img').src,
        text: articleContent.querySelector('.entry-content').innerText
        // .replace(/\n/g, ' ')
      }
    })

    // console.log(text)
    console.log(article)

    // Close the browser.
    await browser.close()

    return article
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

    // Loop through the hrefs and go to each page, and scrape for a-tags there
    for (const href of hrefs) {
      await this.erikshjalpenSubScraper(href)
    }

    // Look for the element with class name postlist and get all the hrefs from all the a-tags inside it
    const subHrefs = await page.evaluate(() => {
      const aTags = document.querySelectorAll('.postlist a')
      return Array.from(aTags).map(aTag => aTag.href)
    })

    console.log(subHrefs)

    const articles = []

    // Loop through the hrefs and scrape each article and push it to the articles array
    for (const href of subHrefs) {
      const article = await this.EHarticleScraper(href)
      articles.push(article)
    }

    console.log(articles)
  }
}
