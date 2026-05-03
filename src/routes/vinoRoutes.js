import { Router } from 'express';
import { VinoController } from '../controllers/VinoController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vinos
 *   description: Gestión del catálogo de vinos
 */

/**
 * @swagger
 * /api/vinos:
 *   get:
 *     summary: Obtener todo el catálogo de vinos
 *     tags: [Vinos]
 *     responses:
 *       200:
 *         description: Lista de vinos instanciados.
 */
router.get('/', VinoController.getAll);

/**
 * @swagger
 * /api/vinos/{id}:
 *   get:
 *     summary: Obtener un vino por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del vino.
 *       404:
 *         description: Vino no encontrado.
 */
router.get('/:id', VinoController.getById);

/**
 * @swagger
 * /api/vinos:
 *   post:
 *     summary: Crear un nuevo vino
 *     tags: [Vinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: number }
 *               nombre: { type: string }
 *               marca: { type: string }
 *               precioMinorista: { type: number }
 *               precioMayorista: { type: number }
 *               stock: { type: number }
 *               tipoUva: { type: string }
 *               tipoVino: { type: string }
 *               anoCosecha: { type: number }
 *               tamanoMl: { type: number }
 *               esOferta: { type: boolean }
 *     responses:
 *       201:
 *         description: Vino creado exitosamente.
 */
router.post('/', VinoController.create);

/**
 * @swagger
 * /api/vinos/{id}:
 *   put:
 *     summary: Actualizar un vino existente
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vino actualizado.
 */
router.put('/:id', VinoController.update);

/**
 * @swagger
 * /api/vinos/{id}:
 *   delete:
 *     summary: Eliminar un vino del catálogo
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vino eliminado.
 */
router.delete('/:id', VinoController.delete);

export default router;
