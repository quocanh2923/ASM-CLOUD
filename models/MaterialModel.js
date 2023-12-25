var mongoose = require('mongoose');
var MaterialSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'material name must be at least 3 characters'],
         maxlength: 20
      },
   });
var MaterialModel = mongoose.model('materials', MaterialSchema);
module.exports = MaterialModel;