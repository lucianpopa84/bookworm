import DS from 'ember-data';

// export default DS.RESTAdapter.extend({
//   namespace: 'api'
// });

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  shouldReloadAll() {
    return true;
  }
});
