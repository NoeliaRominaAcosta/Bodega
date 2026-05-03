import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bodega Fralexis',
      version: '1.2.0',
      description: 'Documentación de la API para el e-commerce de la Bodega Fralexis, desarrollada bajo el paradigma de POO.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos que contienen las anotaciones
};

export const specs = swaggerJsdoc(options);
