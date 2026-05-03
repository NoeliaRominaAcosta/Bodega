import { VinoService } from '../services/VinoService.js';

export class VinoController {
  static async getAll(req, res, next) {
    try {
      const vinos = await VinoService.getAll();
      res.json(vinos);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const vino = await VinoService.getById(req.params.id);
      if (!vino) {
        const error = new Error('Vino no encontrado');
        error.status = 404;
        throw error;
      }
      res.json(vino);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const creado = await VinoService.create(req.body);
      res.status(201).json(creado);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const actualizado = await VinoService.update(req.params.id, req.body);
      if (!actualizado) {
        const error = new Error('Vino no encontrado');
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
      const eliminado = await VinoService.delete(req.params.id);
      if (!eliminado) {
        const error = new Error('Vino no encontrado');
        error.status = 404;
        throw error;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
