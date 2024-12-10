let products = []; // Base de datos en memoria

// Obtener todos los productos
const getAllProducts = (req, res) => {
  const limit = parseInt(req.query.limit) || products.length;
  const limitedProducts = products.slice(0, limit);
  res.json(limitedProducts);
};

// Obtener producto por ID
const getProductById = (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(product);
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  // Validar campos obligatorios
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios, excepto thumbnails' });
  }

  // Generar ID único para el nuevo producto
  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status: true, // Por defecto, status es true
    stock,
    category,
    thumbnails: thumbnails || [] // Si no se pasan thumbnails, asignamos un array vacío
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Actualizar un producto
const updateProduct = (req, res) => {
  const productId = parseInt(req.params.pid);
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  product.title = title || product.title;
  product.description = description || product.description;
  product.code = code || product.code;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.thumbnails = thumbnails || product.thumbnails;

  res.json(product);
};

// Eliminar un producto
const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.pid);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  products.splice(productIndex, 1);
  res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
