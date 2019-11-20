import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  selectedOption: null,
  actions: {
    submit() {
      // // RESTAdapter
      // this.sendAction('action', this.book);

      // // JSONAPIAdapter
      // this.sendAction('action', this.get('book'));

      // JSONAPIAdapter + error validation + select bookstore
      let bookstoreId = null;
      if (this.get('selectedOption')) {
        bookstoreId = this.get('selectedOption');
      } else {
        bookstoreId = this.get('book.bookstore.id');
      }

      if (this.validate()) {
        this.sendAction('action', this.get('book'), bookstoreId);
      }
    },

    selectBookstore(e) {
      this.set('selectedOption', e.target.value); // set bookstore id on select event
    },
    
    validateTitle(value) {
      this.validateTitle(value);
    },

    validateAuthor(value) {
      this.validateAuthor(value);
    },
  },

  bottonLabel: function() {
    return this.get('book').id ? 'Update Book' : 'Add Book';
  }.property(),

  headerLabel: function() {
    return this.get('book').id ? 'Update Book' : 'Add new book';
  }.property(),

  // errors: DS.Errors.create(), // moved to 'new' route (server-side validation)

  validate() {
    this.set('errors', DS.Errors.create()); // create DS errors object

    // if (this.get('book.title') === '' || this.get('book.title') === undefined) {
    //   this.get('errors').add(
    //     'title',
    //     "Please write book title, field can't be empty"
    //   );
    // } //replaced with this.validateTitle(this.get('book.title')); 
    
    this.validateTitle(this.get('book.title')); 

    // if (
    //   this.get('book.author') === '' ||
    //   this.get('book.author') === undefined
    // ) {
    //   this.get('errors').add(
    //     'author',
    //     "Please write book author, field can't be empty"
    //   );
    // } //replaced with this.validateAuthor(this.get('book.author')); 
    
    this.validateAuthor(this.get('book.author')); 

    let forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function(form) {
      form.classList.add('was-validated');
    });

    return this.get('errors.isEmpty');
  },

  validateTitle(value) {
    this.get('errors').remove('title');
    if (value === '' || value === undefined) {
      this.get('errors').add(
        'title',
        "Please write book title, field can't be empty"
      );
    }
  },

  validateAuthor(value) {
    this.get('errors').remove('author');
    if (value === '' || value === undefined) {
      this.get('errors').add(
        'author',
        "Please write book author, field can't be empty"
      );
    }
  },

  didRender() {
    this._super(...arguments);
    let titleInput = document.querySelector('#title');
    // if errors exist
    if (this.get('errors').errorsFor('title').length) {
      // if server-side errors exist
      if (!titleInput.validity.customError) {
        titleInput.setCustomValidity('invalid');
      }
    } else {
      titleInput.setCustomValidity('');
    }
  }
});
