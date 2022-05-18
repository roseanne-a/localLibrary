function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let currentlyReturned = [];
  let currentlyBorrowed = [];

  books.forEach((book) => {
    if (book.borrows[0].returned === false) currentlyBorrowed.push(book);
    else currentlyReturned.push(book);
  });
  //return to separate arrays within one array, not a combined array
  return [currentlyBorrowed, currentlyReturned];
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  let borrowers = [];

  for (const borrow of borrows) {
    let borrowerAccount = accounts.find((account) => account.id === borrow.id);
    //add the returned status to each account
    borrowers.push({ ...borrowerAccount, returned: borrow.returned });
  }

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
