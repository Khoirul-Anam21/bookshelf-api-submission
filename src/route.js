const {
  addBook,
  getAllBooks,
  getBookDetail,
  updateBookById,
  deleteBookById,
  handleMain,
} = require('./handlers');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: handleMain,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookDetail,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;
