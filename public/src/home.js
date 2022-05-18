function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((all, book) => {
    if (book["borrows"].some((item) => item.returned === false)) all.push(book);
    return all;
  }, []).length;
}

function getMostCommonGenres(books) {
  return _sortAndSpliceIntoFive(
    books.reduce((arr, book) => {
      let booksGenre = book.genre;
      let found = arr.find((genre) => genre.name === booksGenre);

      if (!found) {
        arr.push({
          name: booksGenre,
          count: 1,
        });
      } else {
        found.count++;
      }

      return arr;
    }, [])
  );
}

function getMostPopularBooks(books) {
  let mostPopularBooks = [];

  for (const book in books) {
    let count = books[book].borrows.length;
    if (
      !mostPopularBooks.some((oneBook) => oneBook.name === books[book].title)
    ) {
      let newObject = {
        name: books[book].title,
        count,
      };
      mostPopularBooks.push(newObject);
    }
  }
  return _sortAndSpliceIntoFive(mostPopularBooks);
}

function getMostPopularAuthors(books, authors) {
  let mostPopularAuthors = [];

  //loop through each author, loop through each book and increase the count where the ids match
  authors.forEach((author) => {
    let authorsBooks = books.filter((book) => book.authorId === author.id);
    let count = authorsBooks.reduce(
      (acc, eachBook) => acc + eachBook.borrows.length,
      0
    );
    let authorAndTotalBorrowed = {
      name: author.name.first + " " + author.name.last,
      count,
    };
    mostPopularAuthors.push(authorAndTotalBorrowed);
  });
  return _sortAndSpliceIntoFive(mostPopularAuthors);
}

//helper function where sorting and splicing are combined
function _sortAndSpliceIntoFive(inputArray) {
  return inputArray.sort((a, b) => b.count - a.count).splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
