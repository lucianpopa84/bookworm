/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var booksRouter = express.Router();
  var bookstoresRouter = express.Router();

  // ============
  // BOOKS ROUTER
  // ============

  // var books = [
  //   {
  //     id: 1,
  //     title: 'One flew over the nest',
  //     author: 'Ken Kesey',
  //     description: 'One flew over the nest is cool'
  //   },
  //   {
  //     id: 2,
  //     title: 'Hamlet',
  //     author: 'Wiliam Shakespeare',
  //     description: 'Hamlet is cool'
  //   }
  // ];

  var books = [
    {
      data: {
        attributes: {
          title: 'Harry Compoter',
          author: 'J. K. Rowling',
          description: 'A cool story '
        },
        id: 1,
        relationships: { bookstore: { data: { type: 'bookstores', id: '1' } } },
        type: 'books'
      }
    },
    {
      data: {
        attributes: {
          title: "Nobody's Boy",
          author: 'Hector Malot',
          description: 'Sans Famille is an 1878 French novel.'
        },
        id: 2,
        relationships: { bookstore: { data: { type: 'bookstores', id: '2' } } },
        type: 'books'
      }
    },
    {
      data: {
        attributes: {
          title: 'Les Amants',
          author: 'Hector Malot',
          description: 'His first book, published in 1859.'
        },
        id: 3,
        relationships: { bookstore: { data: { type: 'bookstores', id: '2' } } },
        type: 'books'
      }
    }
  ];

  var bookstores = [
    {
      name: 'Carturesti',
      id: 1,
      relationships: []
    },
    {
      name: 'Diverta',
      id: 2,
      relationships: []
    }
  ];

  // GET ALL BOOKS
  booksRouter.get('/', function(req, res) {
    // // RESTAdapter
    // res.send({
    //   books: books
    // });

    // // JSONAPIAdapter
    // var data = [];
    // books.forEach(book => {
    //   data.push({
    //     type: 'books',
    //     id: book.data.id,
    //     attributes: {
    //       title: book.title,
    //       description: book.description,
    //       author: book.author
    //     }
    //   });
    // });

    // JSONAPIAdapter + relationships
    var data = [];
    books.forEach(book => {
      data.push(book.data);
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  // ADD NEW BOOK
  booksRouter.post('/', function(req, res) {
    // // RESTAdapter
    // var newBook = req.body.book;
    // var newId = books.length + 1;
    // newBook.id = newId;
    // books.push(newBook);
    // res.send({
    //   book: newBook
    // });

    // JSONAPIAdapter + relationships
    var newBookAttrs = req.body.data.attributes;
    var newBookRels = req.body.data.relationships;
    var newId = Math.max(...books.map(book => book.data.id), 0) + 1; // compute greatest id and increment it
    var bookTitles = books.map(book => book.data.attributes.title); // map books titles

    if (bookTitles.indexOf(newBookAttrs.title) !== -1) {
      // if error
      res.status(400).send({
        errors: [
          {
            source: { pointer: '/data/attributes/title' },
            detail: 'Book title must be unique!'
          }
        ]
      });
    } else {
      books.push({
        data: {
          attributes: newBookAttrs,
          id: newId,
          type: 'books',
          relationships: newBookRels,
        }
      });

      res.set('Content-Type', 'application/vnd.api+json');
      res.send({
        data: {
          attributes: newBookAttrs,
          id: newId,
          relationships: newBookRels,
          type: 'books'
        }
      });
    }
  });

  // GET BOOK BY ID
  booksRouter.get('/:id', function(req, res) {
    // // RESTAdapter
    // res.send({
    //   book: {
    //     id: req.params.id,
    //     title: books[req.params.id - 1].title,
    //     author: books[req.params.id - 1].author,
    //     description: books[req.params.id - 1].description
    //   }
    // });

    // // JSONAPIAdapter
    // var bookId = req.params.id;
    // var data = [];
    // books.forEach(function(book) {
    //   if (parseInt(bookId) === parseInt(book.id)) {
    //     data = book;
    //   }
    // });

    // JSONAPIAdapter + relationships
    var bookId = req.params.id;
    var data = [];
    books.forEach(function(book) {
      if (parseInt(bookId) === parseInt(book.data.id)) {
        data = book.data;
      }
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  // UPDATE BOOK BY ID
  booksRouter.patch('/:id', function(req, res) {
    var bookAttrs = req.body.data.attributes;
    var bookRels = req.body.data.relationships;
    bookId = req.params.id;
    var bookTitles = [];
    books.forEach(book => {
      if (parseInt(book.data.id) !== parseInt(bookId)) {
        bookTitles.push(book.data.attributes.title);
      };
    });

    if (bookTitles.indexOf(bookAttrs.title) !== -1) {
      // if error
      res.status(400).send({
        errors: [
          {
            source: { pointer: '/data/attributes/title' },
            detail: 'Book title must be unique!'
          }
        ]
      });
    } else {
      books.forEach(book => {
        if (parseInt(book.data.id) === parseInt(bookId)) {
          book.data.attributes.title = bookAttrs.title;
          book.data.attributes.author = bookAttrs.author;
          book.data.attributes.description = bookAttrs.description;
          book.data.relationships = bookRels;
        }
      });

      res.set('Content-Type', 'application/vnd.api+json');
      res.send({
        data: {
          attributes: bookAttrs,
          id: bookId,
          type: 'books',
          relationships: bookRels,
        }
      });
    }
  });

  // DELETE BOOK BY ID
  booksRouter.delete('/:id', function(req, res) {
    var bookId = req.params.id;
    books.forEach((book, index) => {
      if (parseInt(bookId) === parseInt(book.data.id)) {
        books.splice(index, 1);
      }
    });
    res.status(204).end();
  });

  // =================
  // BOOKSTORES ROUTER
  // =================

  // GET ALL BOOKSTORES
  bookstoresRouter.get('/', function(req, res) {
    // JSONAPIAdapter
    var data = [];
    var dataBooks = [];

    bookstores.forEach(bookstore => {
      // get books belonging to bookstore
      books.forEach(book => {
        if (
          parseInt(book.data.relationships.bookstore.data.id) ===
          parseInt(bookstore.id)
        ) {
          dataBooks.push(book.data);
        }
      });
      // push bookstore data
      data.push({
        type: 'bookstore',
        id: bookstore.id,
        attributes: {
          name: bookstore.name
        },
        relationships: {
          books: {
            data: dataBooks
          }
        }
      });
      dataBooks = []; // clear books for the next bookstore
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  // GET BOOKSTORE BY ID
  bookstoresRouter.get('/:id', function(req, res) {
    // JSONAPIAdapter
    var bookstoreId = req.params.id;
    var data = [];
    var dataBooks = [];
    // get books belonging to bookstore
    books.forEach(book => {
      if (
        parseInt(book.data.relationships.bookstore.data.id) ===
        parseInt(bookstoreId)
      ) {
        dataBooks.push(book.data);
      }
    });

    bookstores.forEach(bookstore => {
      if (parseInt(bookstoreId) === parseInt(bookstore.id)) {
        data = {
          type: 'bookstore',
          id: bookstore.id,
          attributes: {
            name: bookstore.name
          },
          relationships: {
            books: {
              data: dataBooks
            }
          }
        };
      }
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/books', require('body-parser'));
  app.use('/api/books', booksRouter);
  app.use('/api/bookstores', bookstoresRouter);
};
