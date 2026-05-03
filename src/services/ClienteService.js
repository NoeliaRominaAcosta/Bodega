import { JsonRepository } from '../data/JsonRepository.js';
import { ClienteMinorista } from '../models/ClienteMinorista.js';
import { ClienteMayorista } from '../models/ClienteMayorista.js';

const repository = new JsonRepository('clientes.json');

export class ClienteService {
  static instantiateCliente(c) {
    if (c.tipo === 'MAYORISTA') {
      return new ClienteMayorista(c.id, c.nombre, c.apellido, c.email, c.telefono, c.direccionEnvio, c.cuit);
    }
    return new ClienteMinorista(c.id, c.nombre, c.apellido, c.email, c.telefono, c.direccionEnvio);
  }

  static async getAll() {
    const data = await repository.getAll();
    return data.map(c => this.instantiateCliente(c));
  }

  static async getById(id) {
    const c = await repository.getById(id);
    if (!c) return null;
    return this.instantiateCliente(c);
  }

  static async create(data) {
    const { id, nombre, apellido, email, telefono, direccionEnvio, tipo, cuit } = data;
    
    // Validación de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }

    let nuevoCliente;
    if (tipo === 'MAYORISTA') {
      // Validación de CUIT (ejemplo simple: 11 dígitos numéricos)
      if (!cuit || !/^\d{11}$/.test(cuit)) {
        throw new Error('El CUIT debe tener 11 dígitos numéricos');
      }
      nuevoCliente = new ClienteMayorista(id, nombre, apellido, email, telefono, direccionEnvio, cuit);
    } else {
      nuevoCliente = new ClienteMinorista(id, nombre, apellido, email, telefono, direccionEnvio);
    }
    return await repository.create(nuevoCliente);
  }

  static async update(id, data) {
    return await repository.update(id, data);
  }

  static async delete(id) {
    return await repository.delete(id);
  }
}
