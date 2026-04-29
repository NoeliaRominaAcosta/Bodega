import express from 'express';
import vinoRoutes from './routes/vinoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use('/api/vinos', vinoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/categorias', categoriaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Bodega Fralexis corriendo en puerto ${PORT}`);
});
