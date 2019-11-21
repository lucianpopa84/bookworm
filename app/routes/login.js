import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      identification: '',
      password: ''
    });
  },

  setupController: function(controller, model) {
    controller.set('credentials', model);
  },

  actions: {
    authenticate(credentials) {
      var _this = this;
      console.log('credentials', credentials);
      // this.get('session').authenticate('simple-auth-authenticator:jwt',credentials)
      // .then(function() {
      //   _this.transitionTo('books');
      // });
    }
  }
});
