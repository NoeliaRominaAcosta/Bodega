import { CategoriaService } from '../services/CategoriaService.js';

export class CategoriaController {
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAll();
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }

  static async getById(req, res) {
    try {
      const categoria = await CategoriaService.getById(req.params.id);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(categoria);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  }

  static async create(req, res) {
    try {
      const creado = await CategoriaService.create(req.body);
      res.status(201).json(creado);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  }

  static async update(req, res) {
    try {
      const actualizado = await CategoriaService.update(req.params.id, req.body);
      if (!actualizado) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(actualizado);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  }

  static async delete(req, res) {
    try {
      const eliminado = await CategoriaService.delete(req.params.id);
      if (!eliminado) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
  }
}
