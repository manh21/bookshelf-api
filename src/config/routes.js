const { addBooks, getAllBooks, getBook, editBook, deleteBook } = require('../controllers/books.js')

const routes = [
    { method: 'GET', path: '/', handler: () => ('Hello World!')},
    { method: 'GET', path: '/test', handler: () => ('You are on the test page')},
    { method: 'POST', path: '/books', handler: addBooks },
    { method: 'GET', path: '/books', handler: getAllBooks },
    { method: 'GET', path: '/books/{bookId}', handler: getBook },
    { method: 'PUT', path: '/books/{bookId}', handler: editBook },
    { method: 'DELETE', path: '/books/{bookId}', handler: deleteBook },
]

module.exports = routes