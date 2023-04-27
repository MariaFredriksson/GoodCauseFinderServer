/**
 * Home controller.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

// import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      // const viewData = {
      //   snippets: (await Snippet.find())
      //     .map(snippet => snippet.toObject())
      // }
      // res.render('home/index', { viewData })
      // res.message = 'Hi from the home controller!'

      const data = {
        blogs: [
          {
            title: 'My First Blog',
            body: 'Why do we use it?\nIt is a long',
            author: 'mario',
            id: 1
          },
          {
            title: 'Opening Party!',
            body: 'Why do we use it?\nIt is a long established',
            author: 'yoshi',
            id: 2
          }
        ]
      }

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
