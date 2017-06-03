const mongoose = require('mongoose');
const Images = mongoose.model('Image');
const schema = new mongoose.Schema({
  name: {type: String},
  description: String,
  imageId: {type: mongoose.Schema.Types.ObjectId, required: true},
  previewImageId: {type: mongoose.Schema.Types.ObjectId, required: true},
  categories: [String]
});

schema.pre('remove', function(next) {
  Images.remove({'_id': { $in: [this.imageId, this.previewImageId] }}).exec();
  next();
});

mongoose.model('Picture', schema, 'pictures');
