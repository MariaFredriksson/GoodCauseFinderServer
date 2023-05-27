
// Import puppeteer for scraping dynamic websites.
import puppeteer from 'puppeteer'
import { Project } from '../models/project.js'

/**
 * A class that represents a general scraper for extracting elements from a webpage.
 */
export class Scraper {
  /**
   * Constructor.
   */
  constructor () {
    // Initialize the header information
    this.headers = {
      'Scrapers-name': 'Maria Fredriksson',
      'Scrapers-email': 'mf223wk@student.lnu.se',
      'Scrapers-university': 'Linnéuniversitetet'
    }
  }

  /**
   * Scrapes a webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async erikshjalpenArticleScraper (url) {
    try {
      // Launch a new browser instance.
      const browser = await puppeteer.launch()

      // Create a new page.
      const page = await browser.newPage()

      // Set the headers for the page to provide my contact information.
      await page.setExtraHTTPHeaders(this.headers)

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

      // Set the categories by calling the function getCategories() and passing the title and text as arguments
      article.category = this.getCategories(article.title, article.text)

      // console.log(text)
      console.log(article)

      // Close the browser.
      await browser.close()

      // Create a new instance of the Project model, and pass in the article object as an argument
      const project = new Project(article)

      // Check if there already exists a project with the same id
      const existingProject = await Project.findOne({ id: article.id })

      // If there already exists a project with the same id, update it
      if (existingProject) {
        await Project.findOneAndUpdate({ id: article.id }, article)
      } else {
        // If there is no existing project, create a new one in the database
        await project.save()
      }

      return article
    } catch (error) {
      // Log the error
      console.error('Error occurred in erikshjalpenArticleScraper:', error)

      // The function will return undefined if an error occurs, which does not affect the execution of other scrapers.
      // The other scrapers will continue to execute normally, regardless of whether an error occurred or not.
    }
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
    await page.setExtraHTTPHeaders(this.headers)
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
    await page.setExtraHTTPHeaders(this.headers)
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

  /**
   * Scrapes a webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async lakarmissionenItemScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders(this.headers)
    await page.goto(url)

    // Get the article by getting the title, image URL and text from the page.
    // Pass url as an argument
    const item = await page.evaluate((url) => {
      const itemContent = document.querySelector('.grid-container .product-item div .product-item__content .component-content')

      // Split the URL by "/"
      const parts = url.split('/')
      // Get the second-to-last part of the URL
      const urlId = parts[parts.length - 2]

      // Select all the p-tags
      const paragraphs = itemContent.querySelectorAll('p')

      // Make an array of all the selected elements, to allow for using map
      // Map over the array and get the innerText from each element
      const texts = Array.from(paragraphs).map((p) => p.innerText)

      // Join the array of texts into one string, and separate them with a new line
      const combinedText = texts.join('\n')

      const rawTitle = itemContent.querySelector('h1').innerText
      // Split the title by ":" and get the first part, and remove any whitespace
      const trimmedTitle = rawTitle.split(':')[0].trim()

      return {
        title: trimmedTitle,
        imgURL: itemContent.querySelector('img').src,
        organization: 'Läkarmissionen',
        text: combinedText,
        articleURL: url,
        id: urlId
      }
      // Pass url as an argument when calling page.evaluate
    }, url)

    // Set the categories by calling the function getCategories() and passing the title and text as arguments
    item.category = this.getCategories(item.title, item.text)

    // console.log(text)
    console.log(item)

    // Close the browser.
    await browser.close()

    // Create a new instance of the Project model, and pass in the item object as an argument
    const project = new Project(item)

    // Check if there already exists a project with the same id
    const existingProject = await Project.findOne({ id: item.id })

    // If there already exists a project with the same id, update it
    if (existingProject) {
      await Project.findOneAndUpdate({ id: item.id }, item)
    } else {
      // If there is no existing project, create a new one in the database
      await project.save()
    }

    return item
  }

  /**
   * Scrapes a Läkarmissionen page using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @returns {Array} An array of articles.
   */
  async lakarmissionenScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders(this.headers)
    await page.goto(url)

    // Look for the element with the class name product-list--normal, and inside it all the divs with the class name product-list__items, and inside them all the divs, and inside them all the elements with a class name cell
    // Loop though all these divs, and get the hrefs from all the a-tags inside them
    const hrefs = await page.evaluate(() => {
      const productListNormal = document.querySelectorAll('.product-list--normal .product-list__items div .cell')
      return Array.from(productListNormal).map(productListItems => {
        const aTag = productListItems.querySelector('a')
        return aTag.href
      })
    })

    console.log(hrefs)

    const items = []

    // Loop through the hrefs and scrape each article and push it to the articles array
    for (const href of hrefs) {
      const item = await this.lakarmissionenItemScraper(href)
      items.push(item)
    }

    console.log(items)

    await browser.close()
  }

  /**
   * Scrapes a webpage using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   */
  async rodaKorsetProductScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders(this.headers)
    await page.goto(url)

    // Get the article by getting the title, image URL and text from the page.
    // Pass url as an argument
    const product = await page.evaluate((url) => {
      const productContent = document.querySelector('.o-content div .o-content__area div .o-content-full .c-produktpaket')

      // Split the URL by "/"
      const parts = url.split('/')
      // Get the second-to-last part of the URL
      const urlId = parts[parts.length - 2]

      // Select all the p-tags
      const paragraphs = productContent.querySelectorAll('p')

      // Make an array of all the selected elements, to allow for using map
      // Map over the array and get the innerText from each element
      const texts = Array.from(paragraphs).map((p, index) => {
        // Exclude the last p-tag from the text key
        if (index === paragraphs.length - 1) {
          // Return an empty string for the last paragraph
          return ''
        } else {
          return p.innerText
        }
      })

      // Join the array of texts into one string, and separate them with a new line
      const combinedText = texts.join('\n')

      return {
        title: productContent.querySelector('h1').innerText,
        imgURL: productContent.querySelector('img').src,
        organization: 'Svenska Röda Korset',
        text: combinedText,
        articleURL: url,
        id: urlId
      }
      // Pass url as an argument when calling page.evaluate
    }, url)

    // Set the categories by calling the function getCategories() and passing the title and text as arguments
    product.category = this.getCategories(product.title, product.text)

    // console.log(text)
    console.log(product)

    // Close the browser.
    await browser.close()

    // Create a new instance of the Project model, and pass in the item object as an argument
    const project = new Project(product)

    // Check if there already exists a project with the same id
    const existingProject = await Project.findOne({ id: product.id })

    // If there already exists a project with the same id, update it
    if (existingProject) {
      await Project.findOneAndUpdate({ id: product.id }, product)
    } else {
      // If there is no existing project, create a new one in the database
      await project.save()
    }

    return product
  }

  /**
   * Scrapes a Svenska Röda Korset page using Puppeteer.
   *
   * @param {string} url - The URL of the webpage to scrape.
   * @returns {Array} An array of articles.
   */
  async rodaKorsetScraper (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders(this.headers)
    await page.goto(url)

    // Look for the element with the class name product-list--normal, and inside it all the divs with the class name product-list__items, and inside them all the divs, and inside them all the elements with a class name cell
    // Loop though all these divs, and get the hrefs from all the a-tags inside them
    const hrefs = await page.evaluate(() => {
      const productListNormal = document.querySelectorAll('.o-content div .o-content__area div .produktgavoblock .c-produktgavoblock')
      return Array.from(productListNormal).map(productListItems => {
        const aTag = productListItems.querySelector('a')
        return aTag.href
      })
    })

    console.log(hrefs)

    const items = []

    // Loop through the hrefs and scrape each article and push it to the articles array
    for (const href of hrefs) {
      const item = await this.rodaKorsetProductScraper(href)
      items.push(item)
    }

    console.log(items)

    await browser.close()
  }

  /**
   * Gets the categories of a project.
   *
   * @param {string} title - The title of the project.
   * @param {string} text - The text of the project.
   *
   * @returns {Array} An array of categories.
   */
  getCategories (title, text) {
    // const availableCategories = ['hälsa', 'jämställdhet', 'utbildning']
    const categories = []

    // Create arrays of words that are related to each category
    const healthKeywords = ['hälsa', 'sjukdom', 'sjukvård', 'sjukhus', 'vårdcentral', 'vård', 'hygien', 'sanitet', 'mödrahälsa', 'vaccin', 'vaccination', 'vaccinationer', 'diabetes', 'undernäring', 'diarré', 'cancer', 'aids', 'hiv', 'malaria', 'tuberkulos']

    const equalityWords = ['jämställdhet', 'genus', 'likabehandling', 'kvinnor', 'kvinna', 'flickor', 'flicka', 'könsroller', 'jämställdhetsarbete', 'diskriminering', 'jämlikhet', 'kvotering', 'feminism', 'normer', 'normkritik', 'könsstereotyper', 'representation', 'jämställdhetspolitik', 'jämställdhetsindex', 'samtycke', 'kvinnojour', 'kvinnofrid', 'våldtäkt']

    const educationKeywords = ['utbildning', 'skola', 'skolor', 'elev', 'elever', 'student', 'studenter', 'lärare', 'undervisning', 'lärande', 'kunskap', 'utbildningsprogram', 'utbildningsresurser', 'pedagogik', 'klassrum', 'utbildningspolitik', 'skolsystem', 'utbildningsmöjligheter']

    // Split the title and text into arrays of words
    let projectWords = title.split(' ')
    projectWords = projectWords.concat(text.split(' '))

    // Loop through the healthKeywords array and check if any of the words in the projectWords array match any of the words in the healthKeywords array
    for (const healthKeyword of healthKeywords) {
      if (projectWords.includes(healthKeyword)) {
        categories.push('hälsa')
        break
      }
    }

    // Loop through the equalityWords array and check if any of the words in the projectWords array match any of the words in the equalityWords array
    for (const equalityWord of equalityWords) {
      if (projectWords.includes(equalityWord)) {
        categories.push('jämställdhet')
        break
      }
    }

    // Loop through the educationKeywords array and check if any of the words in the projectWords array match any of the words in the educationKeywords array
    for (const educationKeyword of educationKeywords) {
      if (projectWords.includes(educationKeyword)) {
        categories.push('utbildning')
        break
      }
    }

    return categories
  }
}
