const express = require('express');
const router = express.Router();
const cartsController = require('../Controllers/cartsController');

// Ruta POST /:cid para agregar productos al carrito
router.post('/:cid/product/:pid', cartsController.addProductToCart);

// Ruta GET /:cid para obtener los productos de un carrito por ID
router.get('/:cid', cartsController.getCartById);

module.exports = router;
