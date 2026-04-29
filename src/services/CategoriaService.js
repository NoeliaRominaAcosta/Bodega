import { JsonRepository } from '../data/JsonRepository.js';
import { Categoria } from '../models/Categoria.js';

const repository = new JsonRepository('categorias.json');

export class CategoriaService {
  static async getAll() {
    const data = await repository.getAll();
    return data.map(c => new Categoria(c.id, c.nombre, c.descripcion));
  }

  static async getById(id) {
    const c = await repository.getById(id);
    if (!c) return null;
    return new Categoria(c.id, c.nombre, c.descripcion);
  }

  static async create(data) {
    const { id, nombre, descripcion } = data;
    const nuevaCategoria = new Categoria(id, nombre, descripcion);
    return await repository.create(nuevaCategoria);
  }

  static async update(id, data) {
    return await repository.update(id, data);
  }

  static async delete(id) {
    return await repository.delete(id);
  }
}
