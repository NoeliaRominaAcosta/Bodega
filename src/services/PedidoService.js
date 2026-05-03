import { JsonRepository } from '../data/JsonRepository.js';
import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { VinoService } from './VinoService.js';
import { ClienteService } from './ClienteService.js';

const repository = new JsonRepository('pedidos.json');

export class PedidoService {
  static async getAll() {
    return await repository.getAll();
  }

  static async getById(id) {
    return await repository.getById(id);
  }

  static async crearPedido(idCliente, itemsData) {
    // 1. Validar Cliente
    const cliente = await ClienteService.getById(idCliente);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    const esMayorista = cliente.tipo === 'MAYORISTA';
    
    // 2. Validar Stock de todos los productos antes de procesar
    const itemsProcesados = [];
    for (const item of itemsData) {
      const vino = await VinoService.getById(item.idProducto);
      if (!vino) {
        throw new Error(`Producto con ID ${item.idProducto} no encontrado`);
      }
      if (vino.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${vino.nombre}`);
      }
      
      const precioUnitario = esMayorista ? vino.precioMayorista : vino.precioMinorista;
      itemsProcesados.push(new ItemPedido(vino.id, item.cantidad, precioUnitario));
    }

    // 3. Crear el Pedido
    const todosLosPedidos = await repository.getAll();
    const nuevoId = todosLosPedidos.length > 0 
      ? Math.max(...todosLosPedidos.map(p => p.id)) + 1 
      : 1;

    const nuevoPedido = new Pedido(
      nuevoId,
      idCliente,
      new Date().toISOString(),
      itemsProcesados
    );
    nuevoPedido.calcularTotal();

    // 4. Descontar Stock y Persistir
    for (const item of itemsProcesados) {
      await VinoService.actualizarStock(item.idProducto, -item.cantidad);
    }

    return await repository.create(nuevoPedido);
  }

  static async actualizarEstado(id, nuevoEstado) {
    return await repository.update(id, { estado: nuevoEstado });
  }
}
