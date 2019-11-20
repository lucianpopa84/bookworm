import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('books', function() {
    this.route('book', { path: '/:book_id' });
    this.route('new');
    this.route('edit', { path: '/:book_id/edit' });
  });
  this.route('login');
  this.route('bookstores', function() {
    this.route('bookstore', { path: '/:bookstore_id' });
  });
});

export default Router;
