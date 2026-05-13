import { DetallePedidoService } from "../services/DetallePedidoService.js";

export class DetallePedidoController {

  static async getAll(req, res) {

    try {

      const detalles = await DetallePedidoService.getAll();

      res.json(detalles);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }

  static async create(req, res) {

    try {

      const detalle = await DetallePedidoService.create(req.body);

      res.status(201).json(detalle);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
}