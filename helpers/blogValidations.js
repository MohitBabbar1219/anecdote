const Validator = require('validator');

const { isEmpty } = require('./generalFunctions');

const validateBlogInputs = (data) => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';
  if (!Validator.isLength(data.text, { min: 10, max: 3000 })) {
    errors.text = 'Blog text must be between 10 and 3000 characters';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }
  data.title = !isEmpty(data.title) ? data.title : '';
  if (!Validator.isLength(data.title, { min: 10, max: 300 })) {
    errors.title = 'Blog title must be between 10 and 300 characters';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateBlogInputs;