import { EnvioService } from '../services/EnvioService.js';

export class EnvioController {
  static async getAll(req, res, next) {
    try {
      const envios = await EnvioService.getAll();
      const enviosConFecha = envios.map(e => ({
        ...e,
        fechaEstimadaEntrega: e.calcularFechaEstimada()
      }));
      res.json(enviosConFecha);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const envio = await EnvioService.getById(parseInt(req.params.id));
      if (!envio) {
        const error = new Error('Envío no encontrado');
        error.status = 404;
        throw error;
      }
      res.json({
        ...envio,
        fechaEstimadaEntrega: envio.calcularFechaEstimada()
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { idPedido, tipo } = req.body;
      const nuevoEnvio = await EnvioService.crearEnvio(idPedido, tipo);
      res.status(201).json(nuevoEnvio);
    } catch (err) {
      next(err);
    }
  }

  static async despachar(req, res, next) {
    try {
      const actualizado = await EnvioService.despacharEnvio(parseInt(req.params.id));
      res.json(actualizado);
    } catch (err) {
      next(err);
    }
  }

  static async entregar(req, res, next) {
    try {
      const actualizado = await EnvioService.entregarEnvio(parseInt(req.params.id));
      res.json(actualizado);
    } catch (err) {
      next(err);
    }
  }
}
