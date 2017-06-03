const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String},
  description: String,
  icon: {type: String},
  code: {type: String, required: true},
  external: {type: Boolean, required: true, default: false}
});
mongoose.model('Category', categorySchema, 'categories');
