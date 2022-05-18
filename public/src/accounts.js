function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    return a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  let accountId = account.id;
  let totalNumberOfBorrows = 0;
  for (let book in books) {
    let { borrows } = books[book];
    if (borrows.some((borrow) => borrow.id === accountId))
      totalNumberOfBorrows++;
  }
  return totalNumberOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksByAuthor = [];
  let accountId = account.id;

  for (let book of books) {
    //check each book for where the account had borrowed the book
    let found = book.borrows.find(
      (eachBorrower) => eachBorrower.id === accountId
    );
    //if the book is found and it was not returned yet by that account, push to the array
    if (found && found.returned === false) {
      let author = authors.find((author) => author.id === book.authorId);
      booksByAuthor.push({ ...book, author });
    }
  }
  return booksByAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
