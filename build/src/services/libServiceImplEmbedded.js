import { BookStatus } from "../model/Book.js";
export class libServiceImplEmbedded {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        const index = this.books.findIndex(item => item.id === book.id);
        if (index === -1) {
            this.books.push(book);
        }
        return false;
    }
    removeBook(id) {
        const book = this.books.findIndex(book => book.id === id);
        if (book === -1)
            throw new Error("Book not found");
        const [removed] = this.books.splice(book, 1);
        return removed;
        { /*
           const book = this.books.find(book => book.id === id)

           if (!book) throw new Error("Book not found")

           book.status = BookStatus.REMOVED;
           return book
       */
        }
    }
    pickUpBook(id, reader) {
        const book = this.books.find(book => book.id === id);
        if (!book)
            throw new Error("Book not found");
        if (book.status === BookStatus.REMOVED) {
            throw new Error("Book removed");
        }
        if (book.status !== BookStatus.ON_STOCK) {
            throw new Error("Book is not available");
        }
        const now = new Date().toISOString();
        const record = {
            reader,
            pick_date: now,
            return_date: null,
        };
        book.pickList.push(record);
        book.status = BookStatus.ON_HAND;
    }
    returnBook(id) {
        const book = this.books.find(book => book.id === id);
        if (!book)
            throw new Error("Book not found");
        const lastRecord = [...book.pickList].reverse().find(r => r.return_date === null);
        if (!lastRecord) {
            throw new Error("No active borrow record found");
        }
        lastRecord.return_date = new Date().toISOString();
        book.status = BookStatus.ON_STOCK;
    }
    getAllBooks() {
        return [...this.books];
    }
    getBooksByGenre(genre) {
        return this.books.filter(book => book.genre === genre);
    }
}
