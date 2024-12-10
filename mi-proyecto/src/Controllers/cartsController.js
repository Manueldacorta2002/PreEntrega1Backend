const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productos.json');
const cartsFilePath = path.join(__dirname, '../data/carrito.json');


const readProductsFromFile = () => {
  try {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData);
  } catch (error) {
    console.error('Error al leer los productos:', error);
    return [];
  }
};

const readCartsFromFile = () => {
  try {
    const cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
    return JSON.parse(cartsData);
  } catch (error) {
    console.error('Error al leer los carritos:', error);
    return [];
  }
};


const saveProductsToFile = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error al guardar los productos:', error);
  }
};


const saveCartsToFile = (carts) => {
  try {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  } catch (error) {
    console.error('Error al guardar los carritos:', error);
  }
};


const getCartById = (req, res) => {
  const cartId = req.params.cid;
  const carts = readCartsFromFile(); 
  const cart = carts.find(c => c.id === cartId);

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  res.json(cart.products);
};


const addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const carts = readCartsFromFile(); 
  const products = readProductsFromFile(); 

  const cart = carts.find(c => c.id === cartId);

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }


  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }


  const productInCart = cart.products.find(p => p.product === parseInt(productId));

  if (productInCart) {
  
    productInCart.quantity += 1;
  } else {
   
    cart.products.push({
      product: parseInt(productId),
      quantity: 1
    });
  }

  saveCartsToFile(carts); 
  res.status(200).json(cart);
};

module.exports = {
  getCartById,
  addProductToCart
};
