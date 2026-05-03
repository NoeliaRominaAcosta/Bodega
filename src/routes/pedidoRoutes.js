import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de transacciones y ventas
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos registrados.
 */
router.get('/', PedidoController.getAll);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener detalle de un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto del pedido.
 *       404:
 *         description: Pedido no encontrado.
 */
router.get('/:id', PedidoController.getById);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Calcula precios automáticamente según el tipo de cliente y valida stock.
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCliente: { type: integer }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idProducto: { type: integer }
 *                     cantidad: { type: integer }
 *     responses:
 *       201:
 *         description: Pedido creado y stock actualizado.
 *       400:
 *         description: Error en validación o stock insuficiente.
 */
router.post('/', PedidoController.create);

/**
 * @swagger
 * /api/pedidos/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado: { type: string, example: "COMPLETADO" }
 *     responses:
 *       200:
 *         description: Estado actualizado.
 */
router.patch('/:id/estado', PedidoController.updateEstado);

export default router;
