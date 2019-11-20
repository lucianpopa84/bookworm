import Ember from 'ember';

export default Ember.Route.extend({
  // setupController: function(controller, model) {
  //   controller.set('books', model);
  // }

  setupController: function(controller, model) {
    controller.set('books', model.books);
  }
});
