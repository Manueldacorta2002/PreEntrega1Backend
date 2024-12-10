const express = require('express');
const app = express();
const cartsRouter = require('./routes/carts');
const productsRouter = require('./routes/products');

// Middlewares
app.use(express.json()); // Para que express pueda parsear el JSON

// Rutas
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

// Iniciar servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
