var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');
var ProductModel = require('../models/ProductModel');

router.get('/', async (req, res) => {
   var categories = await CategoryModel.find({});
   res.render('category/index', { categories });
})

router.get('/add', (req, res) => {
   res.render('category/add');
})

router.post('/add', async (req, res) => {
   var category = req.body;
   await CategoryModel.create(category);
   res.redirect('/category');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM products WHERE category = "id"
   var products = await ProductModel.find({ category: id }).populate('category');
   res.render('category/detail', { products })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM categories WHERE category = id
      await CategoryModel.findByIdAndDelete(id);
      console.log('Delete category succeed !');
   } catch (err) {
      console.log('Delete category fail. Error: ' + err);
   };

   //cách 2
   var category = await CategoryModel.findById(id);
   await CategoryModel.deleteOne(category);

   res.redirect('/category');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM categories
   //     TRUNCATE TABLE categories
   await CategoryModel.deleteMany();
   console.log('Delete all category succeed !');
   res.redirect('/category');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = await CategoryModel.findById(id);
   res.render('category/edit', { category });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = req.body;
   try {
      //SQL: UPDATE categories SET A = B WHERE id = 'id'
      await CategoryModel.findByIdAndUpdate(id, category);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/category');
})
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM products WHERE model LIKE '%keyword%'
   var categories = await CategoryModel.find({ name: new RegExp(keyword, "i") });
   res.render('category/index', { categories })
})

module.exports = router;