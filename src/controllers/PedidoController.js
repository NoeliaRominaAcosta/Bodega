import { PedidoService } from "../services/PedidoService.js";

export class PedidoController {

  static async getAll(req, res) {

    try {

      const pedidos = await PedidoService.getAll();

      res.json(pedidos);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }

  static async create(req, res) {

    try {

      const pedido = await PedidoService.create(req.body);

      res.status(201).json(pedido);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
}