import { ClienteService } from '../services/ClienteService.js';

export class ClienteController {
  static async getAll(req, res, next) {
    try {
      const clientes = await ClienteService.getAll();
      res.json(clientes);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const cliente = await ClienteService.getById(req.params.id);
      if (!cliente) {
        const error = new Error('Cliente no encontrado');
        error.status = 404;
        throw error;
      }
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const creado = await ClienteService.create(req.body);
      res.status(201).json(creado);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const actualizado = await ClienteService.update(req.params.id, req.body);
      if (!actualizado) {
        const error = new Error('Cliente no encontrado');
        error.status = 404;
        throw error;
      }
      res.json(actualizado);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const eliminado = await ClienteService.delete(req.params.id);
      if (!eliminado) {
        const error = new Error('Cliente no encontrado');
        error.status = 404;
        throw error;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
