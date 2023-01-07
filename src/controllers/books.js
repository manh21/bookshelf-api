const { makeId } = require('../utils');
let books = require('../config/store');

exports.addBooks = (request, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        const id = makeId();
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = readPage == pageCount;

        const newBook = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        books.push(newBook);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;

    } catch (error) {
        console.error(error)
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
}

exports.getAllBooks = (request, h) => {
    try {
        const { name, reading, finished } = request.query;

        let result = books.length > 0 ? books : [];

        if (result && name) {
            result = result.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (result && reading) {
            result = result.filter((book) => book.reading == reading);
        }

        if (result && finished) {
            result = result.filter((book) => book.finished == finished);
        }

        const response = h.response({
            status: 'success',
            data: {
                books: result.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;

    } catch (error) {
        console.error(error)
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
}        

exports.getBook = (request, h) => {
    try {
        const { bookId } = request.params;

        // Get book with id
        const book = books.filter((b) => b.id == bookId);

        if (book.length > 0) {
            const response = h.response({
                status: 'success',
                data: {
                    book: book[0],
                },
            });
            response.code(200);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;

    } catch (error) {
        console.error(error)
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
}

exports.editBook = (request, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
        const { bookId } = request.params;

        // Get book with id
        const book = books.filter((b) => b.id == bookId);

        if (book.length == 0) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }

        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        const updatedAt = new Date().toISOString();
        const finished = readPage == pageCount;
        
        const newBook = {
            id: bookId,
            name: name ? name : book[0].name,
            year: year ? year : book[0].year,
            author: author ? author : book[0].author,
            summary: summary ? summary : book[0].summary,
            publisher: publisher ? publisher : book[0].publisher,
            pageCount: pageCount ? pageCount : book[0].pageCount,
            readPage: readPage ? readPage : book[0].readPage,
            finished: finished,
            reading: reading ? reading : book[0].reading,
            insertedAt: book[0].insertedAt,
            updatedAt: updatedAt,
        };

        books = books.map((b) => b.id == bookId ? newBook : b);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;

    } catch (error) {
        console.error(error)
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
}

exports.deleteBook = (request, h) => {
    try {
        const { bookId } = request.params;

        // Get book with id
        const book = books.filter((b) => b.id == bookId);

        if (book.length == 0) {
            const response = h.response({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }

        books = books.filter((b) => b.id != bookId);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    } catch (error) {
        console.error(error)
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
}