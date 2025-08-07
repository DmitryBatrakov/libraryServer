import { v4 as uuidv4 } from 'uuid';
import { BookGenres, BookStatus } from "../model/Book.js";
import { HttpError } from "../errorHandler/HttpError.js";
function getGenre(genre) {
    const bookGenre = Object.values(BookGenres).find(v => v === genre);
    if (!bookGenre) {
        throw new HttpError(400, "Wrong genre");
    }
    else {
        return bookGenre;
    }
}
export const convertBookDtoToBook = (dto) => {
    return {
        id: uuidv4(),
        title: dto.title,
        author: dto.author,
        genre: getGenre(dto.genre),
        status: BookStatus.ON_STOCK,
        pickList: [],
    };
};
