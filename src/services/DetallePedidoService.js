import { DetallePedidoRepository } from "../repositories/DetallePedidoRepository.js";

export class DetallePedidoService {

  static async getAll() {
    return await DetallePedidoRepository.getAll();
  }

  static async create(data) {
    return await DetallePedidoRepository.create(data);
  }
}