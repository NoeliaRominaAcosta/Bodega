import { Envio } from './Envio.js';

export class EnvioExpress extends Envio {
  constructor(id, idPedido, direccion, fechaEnvio, estado) {
    super(id, idPedido, direccion, fechaEnvio, estado);
    this.tipo = 'EXPRESS';
    this.diasEntrega = 1;
  }

  calcularFechaEstimada() {
    const fechaBase = this.fechaEnvio ? new Date(this.fechaEnvio) : new Date();
    const estimada = new Date(fechaBase);
    estimada.setDate(estimada.getDate() + this.diasEntrega);
    return estimada.toISOString();
  }
}
