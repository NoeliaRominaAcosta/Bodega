import express from 'express';
import vinoRoutes from './routes/vinoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import envioRoutes from './routes/envioRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/vinos', vinoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/envios', envioRoutes);

// Middleware de error global (debe ir después de las rutas)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor de Bodega Fralexis corriendo en puerto ${PORT}`);
});
