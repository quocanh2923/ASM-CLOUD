var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
   model: String,
   color: String,
   image: String,
   material:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'materials'
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'  // 'categories': collection
   },
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
   
});
//Relationship : mobiles (many) - brands (one)

var ProductModel = mongoose.model('products', ProductSchema); // 'mobiles' : collection
module.exports = ProductModel;