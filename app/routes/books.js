import Ember from 'ember';

export default Ember.Route.extend({
  // // get books from books mock server
  // model() {
  //   let url = 'http://localhost:4200/api/books';
  //   return Ember.$.getJSON(url);
  // },

  // setupController: function(controller, model) {
  //   controller.set('books', model.books);
  // }

  // get books from store
  model() {
    return this.store.findAll('book');
  },

  setupController: function(controller, model) {
    controller.set('books', model);
  },

  actions: {
    deleteBook: function(book) {
      var _this = this;
      book.destroyRecord().then(function() {
        _this.transitionTo('books');
      });
    }

    // moved to edit.js route
    // updateBook: function(book) {
    //   var _this = this;
    //   book.save().then(function(book) {
    //     _this.transitionTo('books.book', book);
    //   });
    // },

    // // moved to new.js route
    // createBook: function(book) {
    //   var _this = this;
    //   book.save().then(function(book) {
    //     _this.transitionTo('books.book', book);
    //   });
    // }
  }
});
