import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('bookstore', params.bookstore_id);
  },

  setupController: function(controller, model) {
    controller.set('bookstore', model);
  }
});
