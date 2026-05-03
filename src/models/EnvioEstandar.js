import { Envio } from './Envio.js';

export class EnvioEstandar extends Envio {
  constructor(id, idPedido, direccion, fechaEnvio, estado) {
    super(id, idPedido, direccion, fechaEnvio, estado);
    this.tipo = 'ESTANDAR';
    this.diasEntrega = 5;
  }

  calcularFechaEstimada() {
    const fechaBase = this.fechaEnvio ? new Date(this.fechaEnvio) : new Date();
    const estimada = new Date(fechaBase);
    estimada.setDate(estimada.getDate() + this.diasEntrega);
    return estimada.toISOString();
  }
}
