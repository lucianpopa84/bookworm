import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('book');
  },

  setupController(controller, model) {
    controller.set('book', model);
    controller.set('errors', DS.Errors.create());
    controller.set('bookstores', this.store.findAll('bookstore'));
  },
  
  actions: {
    createBook(book, bookstoreId) {
      var _this = this;
      var errors = _this.controllerFor('books.new').get('errors');

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
