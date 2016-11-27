var mongoose = require('mongoose');
var artsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  path: { type: String, required: true },
  previewPath: { type: String, required: true },
  tags: [String]
});
mongoose.model('Arts', artsSchema);
