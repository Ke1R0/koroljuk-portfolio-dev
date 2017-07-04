const mongoose = require('mongoose');
const accessRightsSchema = new mongoose.Schema({
  sectionName: {type: String, required: true},
  accessLevel: {type: Number, required: true, default: 1},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true}
});
mongoose.model('AccessRights', accessRightsSchema, 'access_rights');
