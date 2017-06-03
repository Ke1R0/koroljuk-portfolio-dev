const mongoose = require('mongoose');
const gm = require('gm');

const schema = new mongoose.Schema({
  name: {type: String},
  data: {type: Buffer, required: true}
});

schema.methods.resize = function(x, y) {
  return new Promise((resolve, reject) => {
    gm(this.data, this.name)
      .resize(x, y)
      .toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      }); 
  });
};
mongoose.model('Image', schema, 'images');
