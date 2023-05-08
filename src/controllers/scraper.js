
import { JSDOM } from 'jsdom'

/**
 * A class that represents a general scraper for extracting elements from a webpage.
 */
export class GeneralScraper {
  /**
   * Extracts elements from a webpage.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @param {string} elementName - The name of the element to extract (e.g. 'a', 'div').
   * @param {object} ifAnyOptions - An optional options object that can be passed to the fetch function.
   *
   * @returns {Promise} A promis of an array of HTML elements.
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
}
