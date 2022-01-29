// Get array of books with only id, name, and publisher

const getShortInfoOfBooks = (booksArray) => {
  const newArray = booksArray.map((book) => {
    const { id, name, publisher } = book;
    return {
      id,
      name,
      publisher,
    };
  });
  return newArray;
};

module.exports = getShortInfoOfBooks;