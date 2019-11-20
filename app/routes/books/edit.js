import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('book', params.book_id);
  },

  setupController: function(controller, model) {
    controller.set('book', model);
    controller.set('errors', DS.Errors.create());
    controller.set('bookstores', this.store.findAll('bookstore'));
  },

  actions: {
    updateBook(book, bookstoreId) {
      var _this = this;
      var errors = _this.controllerFor('books.edit').get('errors');

      // set relationship between book and bookstore
      this.store.findRecord('bookstore', bookstoreId).then(bookstore => {
        book.set('bookstore', bookstore);
        // save book
        book.save()
          .then(function(book) {
            _this.transitionTo('books.book', book);
          })
          .catch(function(resp) {
            resp.errors.forEach(function(error) {
              var attribute = error.source.pointer.split('/')[3];
              errors.add(attribute, error.detail);
            });
          });
      });
    }
  }
});
