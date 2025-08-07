import { Response, Request } from 'express'
import { LibService } from "../services/libService.ts";
import { libServiceImplEmbedded } from "../services/libServiceImplEmbedded.ts";
import { Book, BookDto, BookGenres } from '../model/Book.ts';
import { HttpError } from '../errorHandler/HttpError.ts';
import { convertBookDtoToBook } from '../utils/tools.ts';
import { hkdfSync } from 'crypto';

export class BookController {
    private libService: LibService = new libServiceImplEmbedded();

    getAllBooks(req: Request, res: Response ) {
        const result = this.libService.getAllBooks()
        res.json(result)
    }


    addBook(req: Request, res: Response) {
        const dto = req.body as BookDto
        const book: Book = convertBookDtoToBook(dto);
        const result = this.libService.addBook(book)

        if (result) {
            res.status(201).json(book)
        } else {
            throw new HttpError(409, "Book not added. ID conflict");
        }
    }

    removeBook(req: Request, res:Response) {
        const id = req.params.id;

        if(!id) {throw new HttpError(400,"Missing book ID")};

            const removed = this.libService.removeBook(id)
            res.json(removed)
  
    }

    pickUpBook(req: Request, res: Response){
        const id = req.params.id;
        const { reader } = req.body;

        if (!reader || typeof reader !== 'string')  throw new HttpError(400, "Missing reader")

        try {
            this.libService.pickUpBook(id, reader)
            res.status(200).send("Book successfully picked up")
        } catch (error) {
            throw new HttpError(400, (error as Error).message)
        }    

    }

    returnBook(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            throw new HttpError(400, "Missing book ID")
        }

        try{
            this.libService.returnBook(id)
            res.status(200).json({message: "Book successfully returned"});
        } catch (error){
            throw new HttpError(400, ( error as Error).message)
        }
    }

    getBooksByGenre(req: Request, res: Response) {
        const genreParam = req.params.genre as string;

        if(!Object.values(BookGenres).includes(genreParam as BookGenres)){
            throw new HttpError(400, "Invalid genre")
        }

        const genre = genreParam as BookGenres;
        const books = this.libService.getBooksByGenre(genre)
        res.json(books);
    }
}