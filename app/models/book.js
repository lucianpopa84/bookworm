import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  title: attr('string'),
  author: attr('string'),
  description: attr('string'),
  bookstore: belongsTo('bookstore', { async: true }),
});
