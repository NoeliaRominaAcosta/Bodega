import { JsonRepository } from '../data/JsonRepository.js';
import { Vino } from '../models/Vino.js';

const repository = new JsonRepository('vinos.json');

export class VinoService {
  static async getAll() {
    const data = await repository.getAll();
    return data.map(v => new Vino(
      v.id, v.nombre, v.marca, v.precioMinorista, v.precioMayorista, 
      v.stock, v.tipoUva, v.tipoVino, v.anoCosecha, v.tamanoMl, v.esOferta
    ));
  }

  static async getById(id) {
    const v = await repository.getById(id);
    if (!v) return null;
    return new Vino(
      v.id, v.nombre, v.marca, v.precioMinorista, v.precioMayorista, 
      v.stock, v.tipoUva, v.tipoVino, v.anoCosecha, v.tamanoMl, v.esOferta
    );
  }

  static async create(data) {
    const { id, nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta } = data;
    const nuevoVino = new Vino(id, nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta);
    return await repository.create(nuevoVino);
  }

  static async update(id, data) {
    return await repository.update(id, data);
  }

  static async delete(id) {
    return await repository.delete(id);
  }

  // Lógica de negocio movida al service
  static async obtenerPrecio(id, tipoCliente) {
    const vino = await this.getById(id);
    if (!vino) return null;
    return tipoCliente === 'MAYORISTA' ? vino.precioMayorista : vino.precioMinorista;
  }

  static async actualizarStock(id, cantidad) {
    const vino = await this.getById(id);
    if (!vino) return null;
    const nuevoStock = vino.stock + cantidad;
    return await repository.update(id, { stock: nuevoStock });
  }
}
