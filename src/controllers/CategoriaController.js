import { CategoriaService } from '../services/CategoriaService.js';

export class CategoriaController {
  static async getAll(req, res, next) {
    try {
      const categorias = await CategoriaService.getAll();
      res.json(categorias);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const categoria = await CategoriaService.getById(req.params.id);
      if (!categoria) {
        const error = new Error('Categoría no encontrada');
        error.status = 404;
        throw error;
      }
      res.json(categoria);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const creado = await CategoriaService.create(req.body);
      res.status(201).json(creado);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const actualizado = await CategoriaService.update(req.params.id, req.body);
      if (!actualizado) {
        const error = new Error('Categoría no encontrada');
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
      const eliminado = await CategoriaService.delete(req.params.id);
      if (!eliminado) {
        const error = new Error('Categoría no encontrada');
        error.status = 404;
        throw error;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
