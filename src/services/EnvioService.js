import { JsonRepository } from '../data/JsonRepository.js';
import { EnvioEstandar } from '../models/EnvioEstandar.js';
import { EnvioExpress } from '../models/EnvioExpress.js';
import { PedidoService } from './PedidoService.js';

const repository = new JsonRepository('envios.json');

export class EnvioService {
  static instantiateEnvio(e) {
    if (e.tipo === 'EXPRESS') {
      return new EnvioExpress(e.id, e.idPedido, e.direccion, e.fechaEnvio, e.estado);
    }
    return new EnvioEstandar(e.id, e.idPedido, e.direccion, e.fechaEnvio, e.estado);
  }

  static async getAll() {
    const data = await repository.getAll();
    return data.map(e => this.instantiateEnvio(e));
  }

  static async getById(id) {
    const e = await repository.getById(id);
    if (!e) return null;
    return this.instantiateEnvio(e);
  }

  static async crearEnvio(idPedido, tipo = 'ESTANDAR') {
    // 1. Validar que el pedido exista
    const pedido = await PedidoService.getById(idPedido);
    if (!pedido) {
      throw new Error('Pedido no encontrado para generar el envío');
    }

    // 2. Evitar duplicados (un envío por pedido)
    const envios = await repository.getAll();
    if (envios.some(e => e.idPedido === idPedido)) {
      throw new Error('Ya existe un envío programado para este pedido');
    }

    // 3. Crear instancia
    const nuevoId = envios.length > 0 ? Math.max(...envios.map(e => e.id)) + 1 : 1;
    let nuevoEnvio;
    
    // Aquí usamos la dirección del pedido (podría venir del cliente)
    // Para simplificar, asumimos que el pedido tiene una referencia o el service sabe buscarla
    // En este caso, usaremos una dirección genérica o la que venga del pedido si la tuviera
    const direccionDestino = "Dirección registrada en el pedido"; 

    if (tipo === 'EXPRESS') {
      nuevoEnvio = new EnvioExpress(nuevoId, idPedido, direccionDestino);
    } else {
      nuevoEnvio = new EnvioEstandar(nuevoId, idPedido, direccionDestino);
    }

    return await repository.create(nuevoEnvio);
  }

  static async despacharEnvio(id) {
    const e = await this.getById(id);
    if (!e) throw new Error('Envio no encontrado');
    
    e.despachar();
    return await repository.update(id, e);
  }

  static async entregarEnvio(id) {
    const e = await this.getById(id);
    if (!e) throw new Error('Envio no encontrado');
    
    e.entregar();
    return await repository.update(id, e);
  }
}
