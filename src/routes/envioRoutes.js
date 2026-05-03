import { Router } from 'express';
import { EnvioController } from '../controllers/EnvioController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Envios
 *   description: Gestión de logística y entregas
 */

/**
 * @swagger
 * /api/envios:
 *   get:
 *     summary: Obtener todos los envíos
 *     tags: [Envios]
 *     responses:
 *       200:
 *         description: Lista de envíos con fechas estimadas de entrega.
 */
router.get('/', EnvioController.getAll);

/**
 * @swagger
 * /api/envios/{id}:
 *   get:
 *     summary: Obtener detalle de un envío
 *     tags: [Envios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del envío.
 */
router.get('/:id', EnvioController.getById);

/**
 * @swagger
 * /api/envios:
 *   post:
 *     summary: Programar un nuevo envío para un pedido
 *     tags: [Envios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPedido: { type: integer }
 *               tipo: { type: string, enum: [ESTANDAR, EXPRESS], default: ESTANDAR }
 *     responses:
 *       201:
 *         description: Envío programado.
 */
router.post('/', EnvioController.create);

/**
 * @swagger
 * /api/envios/{id}/despachar:
 *   patch:
 *     summary: Marcar un envío como despachado
 *     tags: [Envios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envío despachado.
 */
router.patch('/:id/despachar', EnvioController.despachar);

/**
 * @swagger
 * /api/envios/{id}/entregar:
 *   patch:
 *     summary: Marcar un envío como entregado
 *     tags: [Envios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envío entregado exitosamente.
 */
router.patch('/:id/entregar', EnvioController.entregar);

export default router;
