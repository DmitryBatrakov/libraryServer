import { libServiceImplEmbedded } from "../services/libServiceImplEmbedded.js";
import { BookGenres } from "../model/Book.js";
import { HttpError } from "../errorHandler/HttpError.js";
import { convertBookDtoToBook } from "../utils/tools.js";
export class BookController {
    constructor() {
        this.libService = new libServiceImplEmbedded();
    }
    getAllBooks(req, res) {
        const result = this.libService.getAllBooks();
        res.json(result);
    }
    addBook(req, res) {
        const dto = req.body;
        const book = convertBookDtoToBook(dto);
        const result = this.libService.addBook(book);
        if (result) {
            res.status(201).json(book);
        }
        else {
            throw new HttpError(409, "Book not added. ID conflict");
        }
    }
    removeBook(req, res) {
        const id = req.params.id;
        if (!id)
            throw new HttpError(400, "Missing book ID");
        try {
            const removed = this.libService.removeBook(id);
            res.json(removed);
        }
        catch (error) {
            throw new HttpError(404, "Book not found");
        }
    }
    pickUpBook(req, res) {
        const id = req.params.id;
        const { reader } = req.body;
        if (!reader || typeof reader !== 'string')
            throw new HttpError(400, "Missing reader");
        try {
            this.libService.pickUpBook(id, reader);
            res.status(200).send("Book successfully picked up");
        }
        catch (error) {
            throw new HttpError(400, error.message);
        }
    }
    returnBook(req, res) {
        const id = req.params.id;
        if (!id) {
            throw new HttpError(400, "Missing book ID");
        }
        try {
            this.libService.returnBook(id);
            res.status(200).json({ message: "Book successfully returned" });
        }
        catch (error) {
            throw new HttpError(400, error.message);
        }
    }
    getBooksByGenre(req, res) {
        const genreParam = req.params.genre;
        if (!Object.values(BookGenres).includes(genreParam)) {
            throw new HttpError(400, "Invalid genre");
        }
        const genre = genreParam;
        const books = this.libService.getBooksByGenre(genre);
        res.json(books);
    }
}
