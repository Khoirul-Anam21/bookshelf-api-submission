const { nanoid } = require('nanoid');
const books = require('../books');

// Kriteria 1
const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

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

  const noNameInRequest = name === undefined;
  const readPageInvalid = readPage > pageCount;
  if (noNameInRequest) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPageInvalid) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);
  const isAdded = books.filter((book) => book.id === id) !== null;
  if (isAdded) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Kriteria 2
const getAllBooks = (_request, h) => {
  const newBookList = books.map((book) => {
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });
  const response = h.response({
    status: 'success',
    data: {
      books: newBookList,
    },
  });
  response.code(200);
  return response;
};

const getBookDetail = (request, h) => {
  const { id } = request.params;
  const requestedBook = books.filter((book) => book.id === id)[0];
  if (requestedBook === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  return {
    status: 'success',
    data: {
      book: requestedBook,
    },
  };
};

const updateBookById = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const readPageInvalid = readPage > pageCount;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPageInvalid) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  return {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  };
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(bookIndex, 1);
  return {
    status: 'success',
    message: 'Buku berhasil dihapus',
  };
};

module.exports = {
  addBook,
  getAllBooks,
  getBookDetail,
  updateBookById,
  deleteBookById,
};