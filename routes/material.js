var express = require('express');
var router = express.Router();
var MaterialModel = require('../models/MaterialModel');
var ProductModel = require('../models/ProductModel');

router.get('/', async (req, res) => {
   var materials = await MaterialModel.find({});
   res.render('material/index', { materials });
})

router.get('/add', (req, res) => {
   res.render('material/add');
})

router.post('/add', async (req, res) => {
   var material = req.body;
   await MaterialModel.create(material);
   res.redirect('/material');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM products WHERE material = "id"
   var products = await ProductModel.find({ material: id }).populate('material');
   res.render('material/detail', { products })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM materials WHERE material = id
      await MaterialModel.findByIdAndDelete(id);
      console.log('Delete material succeed !');
   } catch (err) {
      console.log('Delete material fail. Error: ' + err);
   };

   // //cách 2
   // var material = await MaterialModel.findById(id);
   // await MaterialModel.deleteOne(material);

   // res.redirect('/material');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM materials
   //     TRUNCATE TABLE materials
   await MaterialModel.deleteMany();
   console.log('Delete all material succeed !');
   res.redirect('/material');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var material = await MaterialModel.findById(id);
   res.render('material/edit', { material });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var material = req.body;
   try {
      //SQL: UPDATE materials SET A = B WHERE id = 'id'
      await MaterialModel.findByIdAndUpdate(id, material);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/material');
})
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM products WHERE model LIKE '%keyword%'
   var materials = await MaterialModel.find({ name: new RegExp(keyword, "i") });
   res.render('material/index', { materials })
})

module.exports = router;