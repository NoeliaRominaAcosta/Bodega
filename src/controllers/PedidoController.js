import { PedidoService } from '../services/PedidoService.js';

export class PedidoController {
  static async getAll(req, res, next) {
    try {
      const pedidos = await PedidoService.getAll();
      res.json(pedidos);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const pedido = await PedidoService.getById(parseInt(req.params.id));
      if (!pedido) {
        const error = new Error('Pedido no encontrado');
        error.status = 404;
        throw error;
      }
      res.json(pedido);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { idCliente, items } = req.body;
      if (!idCliente || !items || !Array.isArray(items)) {
        const error = new Error('Datos de pedido inválidos: idCliente e items (array) son requeridos');
        error.status = 400;
        throw error;
      }
      const nuevoPedido = await PedidoService.crearPedido(idCliente, items);
      res.status(201).json(nuevoPedido);
    } catch (err) {
      next(err);
    }
  }

  static async updateEstado(req, res, next) {
    try {
      const { estado } = req.body;
      const actualizado = await PedidoService.actualizarEstado(parseInt(req.params.id), estado);
      if (!actualizado) {
        const error = new Error('Pedido no encontrado');
        error.status = 404;
        throw error;
      }
      res.json(actualizado);
    } catch (err) {
      next(err);
    }
  }
}
