import express from 'express'
import { BookController } from '../controllers/BookController.ts'

export const bookRouter = express.Router()

const controller = new BookController();

bookRouter.get('/', controller.getAllBooks.bind(controller));
// bookRouter.post('/', bodyValidator(BookDtoJoiSchema), controller.addBook);

bookRouter.post('/', controller.addBook.bind(controller));

bookRouter.delete('/:id', controller.removeBook.bind(controller));

bookRouter.get('/genre/:genre', controller.getBooksByGenre.bind(controller));

bookRouter.post('/pick/:id', controller.pickUpBook.bind(controller));

bookRouter.post('/return/:id', controller.returnBook.bind(controller))
