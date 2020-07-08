var router = require('express').Router();

const productController = require('../controllers/product.controller');

/* GET home page. */
router.post('/add', productController.addProduct);

router.get('/get_all', productController.getProducts);

router.put('/edit/:pid', productController.editProduct);

router.delete('/delete/:pid', productController.deleteProduct);
module.exports = router;