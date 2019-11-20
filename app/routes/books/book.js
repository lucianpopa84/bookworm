import Ember from 'ember';

export default Ember.Route.extend({
  // // get books from books mock server
  //   model(params) {
  //     let url = 'http://localhost:4200/api/books/';
  //     return Ember.$.getJSON(url + params.book_id);
  //   },
  //   setupController: function(controller, model) {
  //     controller.set('book', model.book);
  //   }

  // get books from store
  model(params) {
    return this.store.findRecord('book', params.book_id);
  },

  setupController: function(controller, model) {
    controller.set('book', model);
  },

  // setupController: function(controller, models) {
  //   return controller.setProperties(models);
  // },
});
