export const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);

  // Errores de validación o lógica de negocio (usualmente lanzados con throw new Error)
  const statusCode = err.status || 400;
  
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor'
  });
};
