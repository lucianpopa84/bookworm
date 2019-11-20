import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('bookstore');
      },
    
      setupController: function(controller, model) {
        controller.set('bookstores', model);
      },

      actions: {
      },
});
